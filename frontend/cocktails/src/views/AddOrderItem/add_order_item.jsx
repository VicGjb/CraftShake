import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function AddOrderItem() {
    let {orderId} = useParams();
	let defaultForm = {
        quantity:'',
        item_price:0,
        order:1,
        position:''
    }
    let [loaded,setLoaded] = useState(false)
    let [order,setOrder] = useState({})
    let [form, setForm] =  useState(defaultForm);
    let [menu, setMenu] = useState([]);
    let [positions, setPositions] = useState([]);
    let [position,setPosition] = useState({});
    
    
    useEffect(() => {
        axios({
          method: 'GET',
          url: `http://127.0.0.1:8000/api/counter/order/1/` 
            }).then(response => { 
                setOrder(response.data);
                console.log(response.data);
                console.log('order', order);
                axios({
                    method: 'GET',
                    url: `http://127.0.0.1:8000/api/counter/menu/?place=${response.data.place}`
                  }).then(response =>{
                      setMenu(response.data.results);
                      console.log(response.data.results);
                  })
        })
    }, [orderId])
    
    
    function getPositions(props){
        let menuId = props
        console.log('Heyyy',menuId)
        axios({
            method:'GET',
            url: `http://127.0.0.1:8000/api/counter/menu-position/?menu=${menuId}`
        }).then(response =>{
            setPositions(response.data.results);
            console.log('PIZDA')
        })
    }


    function getPosition(props){
        console.log('getPoss')
        let positionId = props
        axios({
            method:'GET', 
            url:`http://127.0.0.1:8000/api/counter/menu-position/${positionId}/`
        }).then(response =>{
            setPosition(response.data);
            console.log('GetPoss',response.data)
        })
    }
    function calculateTotal(quantity){
        let result = quantity * position.sale_price
        return(
            result.toFixed(2)
        )
    }
    let changeMenu = e =>{
        console.log('ChengeMenu')
        getPositions(e.target.value);
        setForm({...form, [e.target.name]:e.target.value});
    }
    let changePosition = e =>{
        console.log('ChPos');
        getPosition(e.target.value);
        setForm({...form, [e.target.name]:e.target.value, ['quantity']:0, ['item_price']:0});   
    }
    let changeQuantity = e =>{  
        let a=calculateTotal(e.target.value);
        setForm({...form, [e.target.name]:e.target.value, ['item_price']:a});
        console.log('total',a)
    }
    let submitHandler = e => {
		e.preventDefault()
        console.log(form)
        axios
			.post('http://127.0.0.1:8000/api/counter/order-item/create/', form)
			.then(response => {
				console.log(response);
                window.location.reload();
			})
			.catch(error => {
				console.log(error);
				throw error;
			});		
	}
    return(
        <div>
            <form onSubmit={submitHandler}>
				<div>
                    <div>place: {order.place}</div>
					<div>
                        Menu:
                        <select 
                        name='menu' 
                        value={form.menu}
                        onChange={changeMenu}
                        required
                        >
                            <option></option>
                            {menu.map(menu=>(
                                <option key={menu.id} value={menu.id}>{menu.name}</option>
                            ))}
                        </select> 
                    </div>
                    <div>
                        Position:
                        <select 
                        name='position' 
                        value={form.position}
                        onChange={changePosition}
                        required
                        >
                            <option></option>
                            {positions.map(p=>(
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select> 
                    </div>
                    <div>
                    quantity: 
                        <input
                            type="number"
                            step="0.2"
                            name="quantity"
                            value={form.quantity}
                            onChange={changeQuantity}
                        />
                    </div>
                    <div>
                        total {form.item_price}
                    </div>

                </div>
                <button type="submit">Submit</button>
            </form>

          </div>
    )
}