import React, {useState} from 'react';
import { NetworkManager } from '../../components/network_manager';
import { RegularButton } from '../../components/buttons/regular_button';

export function AddProduct({setAddProductActive}) {
	let defaultForm = {
        name:'',
        cost_price:'0.00',
        discription:'',
        sale_price:'0.00',
    }
    let network_manager = new NetworkManager()
	let [form, setForm] =  useState(defaultForm);
    let [product, setProduct] = useState([]);
    let changeHandler = e => {
		setForm({...form, [e.target.name]:e.target.value})
	}

    let submitHandler = e => {
		e.preventDefault()
        network_manager.create_product(form)
			.then(response => {
				console.log(response);
				setProduct([...product, response.data]);
				setForm(defaultForm);
                console.log(form)
			})
			.catch(error => {
				console.log(error);
				throw error;
			});		
        window.location.reload();
        
	}

    function ToGo(){
        setAddProductActive(false)
    }

      return (
			<form onSubmit={submitHandler} className='add_product_form'>
				<div>
					<div className='add_product_input_wrapper'>
                        <div className='add_product_input_labele regular_text_small'>
                            Name:
                        </div>
                        <input
                            className='name'
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='add_product_input_wrapper'>
                        <div className="add_product_input_labele regular_text_small">
                            Discription:
                        </div>
                        <textarea
                            className='discription_input'
                            type="text"
                            name="discription"
                            value={form.discription}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='add_product_input_wrapper'>
                        <div className="add_product_input_labele regular_text_small">
                            Cost price:
                        </div>
                        <input
                            className='price'
                            type="number"
                            step={0.01}
                            min='0'
                            name="cost_price"
                            value={form.cost_price}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='add_product_input_wrapper'>
                        <div className="add_product_input_labele regular_text_small">
                            Sale price:    
                        </div>
                        <input
                            className='price'
                            type="number"
                            step={0.01}
                            min='0'
                            name="sale_price"
                            value={form.sale_price}
                            onChange={changeHandler}
                        />
                    </div>
				</div>
                <div type="submit" className='add_product_submit_btn' onClick={ToGo}>
                        <RegularButton lable={'Add'}></RegularButton>
                </div>  
			</form>
	)
}