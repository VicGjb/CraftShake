import React, { useState } from "react";
import { NetworkManager } from "../network_manager";
import { useEffect } from "react";
import { RegularButton } from "../buttons/regular_button";
import { useNavigate, useParams } from "react-router-dom";

export function PopupAddMenuPosition({add_menu_position_active, setAdd_menu_position_active, menu}){
    let {placeId}=useParams()
    let defaultForm = {
        name:'',
        sale_price:0.00,
        menu:menu.id,
        product:'',
    }
    let [form, setForm] =  useState(defaultForm);
    let[products, setProducts] = useState([]);
    let navigate = useNavigate();
    let network_manager = new NetworkManager()
    
    useEffect(() => {
        network_manager.get_product_list()
            .then(products => {
                setProducts(products);
                console.log(products);
                })
	  }, [])

    function submitHandler(e){
        e.preventDefault()
        network_manager.create_menu_position(form)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
				throw error;
			});	
            navigate(`${placeId}/menus/${menu.id}`, {state:{from:menu},replace:false})
            window.location.reload();	
    }
    function changeHandler(e){
        setForm({...form, [e.target.name]:e.target.value});
        console.log(form)
    }
    function changeProductHandler(e){
        setForm({...form, [e.target.name]:e.target.value, ['name']:products.filter(product=>product.id == e.target.value)[0].name});
        console.log(form)
    }
    
    function ToGo(){
        console.log('HHH')
    }

    return(
        <div className={add_menu_position_active ? 'popup_wrapper active' : 'popup_wrapper'} onClick={()=>setAdd_menu_position_active(false)}>
            <div className="popup_content" onClick={e => e.stopPropagation()}>
                <div className="popup_title">
                    Add product to <br/>{menu.name}
                </div>
                <form onSubmit={submitHandler} className='add_menu_position_form regular_text_small'>
                    <div className="add_menu_position_wrapper">
                        <div className="sale_price_lable">
                            Product: 
                        </div>
                        <div>
                            <select 
                                    name='product' 
                                    value={form.product}
                                    onChange={changeProductHandler}
                                    required
                                >
                                <option></option>
                                {products.map(product=>(
                                    <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                            </select> 
                        </div>
                    </div>

                    <div className='add_menu_position_wrapper'>
                        <div className='add_menu_position_name_labele regular_text_small'>
                            Name:
                        </div>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="add_menu_position_wrapper">
                        <div className="sale_price_lable">
                            Sale price: 
                        </div>
                        <div>
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
                    <div type="submit"  onClick={ToGo} className='add_menu_position_submit_btn'>
                        <RegularButton lable={'Add'}></RegularButton>
                    </div>               
                </form>           
            </div>
        </div>
    )
}