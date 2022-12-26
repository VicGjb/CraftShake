import React from "react";
import { useState } from "react";
import { NetworkManager } from '../../components/network_manager';
import { RegularButton } from '../../components/buttons/regular_button';
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"
import '../../styles/popup_add_product.scss'

export function PopupAddProduct({
        add_product_active, 
        setAddProductActive, 
        setProducts,
        setProduct,
        product,
    }){
    let defaultForm = setDefaultForm()
    let network_manager = new NetworkManager()
    let [form, setForm] =  useState(defaultForm);
    

    function setDefaultForm(){
        if(product){
            return({
                    name:product.name,
                    cost_price:product.cost_price,
                    description:product.description,
                    sale_price:product.sale_price,   
                })
        }else{
            console.log('product', product)
            return({
                    name:'',
                    cost_price:'0.00',
                    description:'',
                    sale_price:'0.00', 
                })
        }
    }
    
    
    let changeHandler = e => {
		setForm({...form, [e.target.name]:e.target.value})
	}

    
    let submitHandler = e => {
		e.preventDefault()

        if (product){
            network_manager.change_product(product.id, form)
            .then(product => {
                setProduct(product.data);
            })
            .catch(error => {
                console.log(error);
                throw error;
            });		
        }else{
            network_manager.create_product(form)
			.then(response => {
                setProducts(response.data)
			})
			.catch(error => {
				console.log(error); 
				throw error;
			});		
        } 
        setAddProductActive(false);
	}

    return(
        <div className={add_product_active ? 'popup_mobile_wrapper active' : 'popup_mobile_wrapper'} onClick={()=>setAddProductActive(false)}>
            <div className="popup_mobile_content add_product" onClick={e => e.stopPropagation()}>
                <div className="popup_filter_sevice_button_wrapper">
                    <div className="popup_filter_close_button" onClick={()=>{setAddProductActive(false)}}>
                        <CloseIcon className='close_button_icon'/>
                    </div> 
                </div>
                
                
                <div className="popup_title add_product">
                    {product? `Update product ${product.name} `:'Create new product'}
                </div>

                <form onSubmit={submitHandler} className='add_product_form'>
                        <div className='add_product_input_wrapper'>
                            <div className='add_product_input_label'>
                                Name:
                            </div>
                            <input
                                className="name"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className='add_product_input_wrapper'>
                            <div className="add_product_input_label">
                                Description:
                            </div>
                            <textarea
                                className='description_input'
                                type="text"
                                name="description"
                                value={form.description}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className='add_product_input_wrapper'>
                            <div className="add_product_input_label">
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
                            <div className="add_product_input_label">
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
                    <div type="submit" className='add_product_submit_btn'>
                            <RegularButton lable={'Add'}></RegularButton>
                    </div>  
                </form>
                             
            </div>
        </div>
    )
}