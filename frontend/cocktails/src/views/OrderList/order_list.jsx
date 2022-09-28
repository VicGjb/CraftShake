import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useManeContext } from "../../components/main_context";
import { AddButton } from "../../components/buttons/add_button";
import { PopupAddOrder } from "../../components/popup/popup_add_order";
import { RegularButton } from "../../components/buttons/regular_button";

export function OrderList(){
    let main_context = useManeContext()
    let [order, setOrder] = useState([]);
    let {placeNmae} = useParams();
    let {placeId} = useParams();

    let [add_order_active, setAdd_order_active] = useState(false)
    let defaultForm = {
        date_from: '',
        date_to:'',
        place: {placeId}
    }
    let [form, setForm] = useState(defaultForm);

    useEffect(()=> {
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/api/counter/order/?place=${placeId}`
        }).then(response => {
            setOrder(response.data.results);
    })
    }, [placeId])

    let changeHandler = e =>{
        setForm({...form, [e.target.name]:e.target.value, ['place']:placeId});
    }
    function SearchOrders(e){
        e.preventDefault()
        axios
            .get(`http://127.0.0.1:8000/api/counter/order/?place=${placeId}&date_after=${form.date_from}&date_before=${form.date_to}`)
            .then(response =>{
                setOrder(response.data.results);
                console.log('Hui gavni=o',response)
            })
    }
    
    return (
        <div>
            <div>
                <div className="order_list_content">
                    <div className="order_list_content_title">
                        <p className="regular_text">Orders</p>
                    </div>
                    <div className="service_button_row">
                        <div className="service_row_button_wrapper" onClick={main_context.goBack}>
                            <RegularButton lable={'Back'}/>
                        </div>
                    <div className="add_batton_wrapper" onClick={()=>setAdd_order_active(true)}>
                                <AddButton  lable={'Add order'} />   
                    </div>
                
            </div>   
                    <div className="order_list_container">
                        <div className="order_list_table_wrapper">
                            <div className="order_list_table">
                                <div className='thead'>
                                    <div className="order_list_table_head tr">
                                        <div className="th"><div className="regular_text">Date</div></div>
                                        <div className="th"><div className="regular_text">Id</div></div>
                                        <div className="th"><div className="regular_text">Total</div></div>
                                    </div>
                                </div >
                                <div className='tbody'>
                                    {order.map(order => (
                                        <Link to={`${order.id}`} key={order.id}>
                                            <div className="order_list_table_row tr">
                                                <div className="td"><div className="regular_text_small">{order.date}</div></div>
                                                <div className="td"><div className="regular_text_small">{order.id}</div></div>
                                                <div className="td"><div className="regular_text_small">{order.total_price}</div></div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>                
                            </div>
                        </div>
                        <div className="order_list_button_set">
                            <form onSubmit={SearchOrders} className='add_order_form'>
                                <div className="add_order_popup_date">
                                    <div className="date_lable">
                                        From
                                    </div>
                                    <div>
                                        <input
                                            className="date_input"
                                            type='date'
                                            name='date_from'
                                            onChange={changeHandler}
                                        />
                                    </div>
                                </div>
                                <div className="add_order_popup_date">   
                                    <div className="date_lable">
                                        To
                                    </div>
                                    <div>
                                        <input
                                            className="date_input"
                                            type='date'
                                            name='date_to'
                                            onChange={changeHandler}
                                        />
                                    </div>
                                </div>
                                <div type="submit">
                                    <RegularButton lable={'Search'}></RegularButton>
                                </div>               
                            </form>           
                        </div>        
                    </div>
                </div>
            </div>
            <PopupAddOrder add_order_active={add_order_active} setAdd_order_active={setAdd_order_active}/>
        </div>
    )
}