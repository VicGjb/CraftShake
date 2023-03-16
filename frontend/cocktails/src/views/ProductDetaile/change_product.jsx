import React from "react";
import { useState } from "react";
import { NetworkManager } from "../../api/network_manager";
import { RegularButton } from "../../components/buttons/regular_button";

export function ChangeProduct({setChangeProductActive, product}) {
	let defaultForm = {
        name: product.name,
        cost_price: product.cost_price,
        discription: product.discription,
        sale_price: product.sale_price,
    }
    let network_manager = new NetworkManager();
	let [form, setForm] =  useState(defaultForm);

    let changeHandler = e => {
		setForm({...form, [e.target.name]:e.target.value})
	}

    let submitHandler = e => {
		e.preventDefault()
        network_manager.change_product(product.id, form)
        .then(product => {
            //console.log(product);
            setForm(defaultForm);
            //console.log(form)
        })
        .catch(error => {
            //console.log(error);
            throw error;
        });		
        window.location.reload();
        
	}

    function ToGo(){
        setChangeProductActive(false)
    }

      return (
		<div>
			<form onSubmit={submitHandler} className='add_product_form'>
				<div>
					<div className='add_product_input_wrapper'>
                        <div className='add_product_input_labele regular_text_small'>
                            Name:
                        </div>
                        <input
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
                        <RegularButton lable={'Change'}></RegularButton>
                </div>  
			</form>
		</div>
	)
}