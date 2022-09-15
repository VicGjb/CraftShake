import React, {useEffect, useState } from 'react';
import axios from 'axios';

export function AddMenuPosition() {
	let defaultForm = {
        sale_price:'',
        menu:'',
        product:'',
    }
    let [form, setForm] =  useState(defaultForm);
    let [menu, setMenu] = useState([]);
    let [product, setProduct] = useState([]);
    let changeHandler = e => {
		setForm({...form, [e.target.name]:e.target.value});
        console.log(form)
	}

    let submitHandler = e => {
		e.preventDefault()
        console.log(form)
        axios
			.post('http://127.0.0.1:8000/api/counter/menu-position/create/', form)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
				throw error;
			});		
	}

    useEffect(() => {
		axios({
		  method: 'GET',
		  url: 'http://127.0.0.1:8000/api/counter/menu/'
		})
        .then(response => {setMenu(response.data.results);
            console.log(response.data.results);
        })
	  }, [])

      useEffect(() => {
		axios({
		  method: 'GET',
		  url: 'http://127.0.0.1:8000/api/counter/product/'
		})
        .then(response => {setProduct(response.data.results);
            console.log(response.data.results);
        })
	  }, [])

    return(
        <div>
            <form onSubmit={submitHandler}>
				<div>
					<div>
                        Menu: 
                        <select 
                        name='menu' 
                        value={form.menu}
                        onChange={changeHandler}
                        required
                        >
                            <option></option>
                            {menu.map(menu=>(
                                <option key={menu.id} value={menu.id}>{menu.name}</option>
                            ))}
                        </select> 
                    </div>
                    <div>
                        Product: 
                        <select 
                        name='product' 
                        value={form.product}
                        onChange={changeHandler}
                        required
                        >
                            <option></option>
                            {product.map(product=>(
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select> 
                    </div>
                    <div>
                        Sale price: 
                        <input
                            type="text"
                            name="sale_price"
                            value={form.sale_price}
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>

          </div>
    )
}