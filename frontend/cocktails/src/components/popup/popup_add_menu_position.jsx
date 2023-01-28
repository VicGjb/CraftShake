import React, { useState } from "react";
import { useRef } from "react";
import { NetworkManager } from "../network_manager";
import { useEffect } from "react";
import { RegularButton } from "../buttons/regular_button";
import { useNavigate, useParams } from "react-router-dom";
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"
import { useMenuDetaileContext } from "../../views/MenuDetaile/MenuDetaileContext";
import '../../styles/popup_add_menu_position.scss'

export function PopupAddMenuPosition({add_menu_position_active, setAdd_menu_position_active}){
    let menuDetaileContext = useMenuDetaileContext()
    let menu = menuDetaileContext.getMenu
    let {placeId}=useParams()
    let defaultForm = {
        name:'',
        volume:100,
        sale_price:0.00,
        menu:menu.id,
        product:'',
    }
    let product_name = useRef()
    let [form, setForm] =  useState(defaultForm);
    let [on_focus, setOnFocus] = useState(false);
    let [products, setProducts] = useState([]);
    let network_manager = new NetworkManager()

    
    
    useEffect(() => {
        network_manager.get_product_list()
            .then(products => {
                setProducts(products);
                console.log(products);
                })
	  }, [])

    function onFocusChange(){
        setOnFocus(true)
    }
    function onBlurChange(){
        setOnFocus(false)
    }

    function submitHandler(e){
        e.preventDefault()
        network_manager.create_menu_position(form)
			.then(response => {
				console.log('responce',response);
                menuDetaileContext.addMenuPosition(response.data)
			})
			.catch(error => {
				console.log(error);
				throw error;
			});	
            setForm(defaultForm)
            product_name.current.value = defaultForm['product']
            setAdd_menu_position_active(false)	
    }
    function changeHandler(e){
        setForm({...form, [e.target.name]:e.target.value});
        console.log(form)
    }

    function getProductListByName(e){
        if (e.target.value === ''){
            network_manager.get_product_list()
            .then(products => {
                setProducts(products);
                })
                return
            }
        network_manager.get_products_by_name(e.target.value)
            .then(response=>{
                setProducts(response)
            })
    }
    function onChoiseProduct(e){
        setForm({...form,['product']:e.target.value, ['name']:products.filter(product=>product.id === e.target.value)[0].name});
        product_name.current.value = products.filter(product=>product.id === e.target.value)[0].name
        onBlurChange()
    }

    return(
        <div className={add_menu_position_active ? 'popup_mobile_wrapper active' : 'popup_wrapper'} onClick={()=>setAdd_menu_position_active(false)}>
            <div className="popup_mobile_content_add_menu_position" onClick={e => e.stopPropagation()}>
                <div className="popup_filter_sevice_button_wrapper">
                    <div className="popup_filter_close_button" onClick={()=>{setAdd_menu_position_active(false)}}>
                        <CloseIcon className='close_button_icon'/>
                    </div> 
                </div>
                <div className="popup_title add_menu_position">
                    Add product to {menu.name}
                </div>
                <form onSubmit={submitHandler} className='add_menu_position_form'>
                    <div className="add_menu_position_wrapper">
                        <div className="label">
                            Product: 
                        </div>
                        <div className="input_menu_position_wrapper">
                            <input
                                type="text"
                                name="product"
                                className="add_menu_position_input_feild"
                                onFocus={onFocusChange}
                                onChange={getProductListByName}
                                autoComplete='off'
                                ref={product_name}
                                default = {form.product}
                                />
                                {on_focus === true ?(  
                                    <div className="div">
                                        <div className="on_blur" onClick={onBlurChange}></div>
                                        <ul className="product_list">
                                            
                                            {products.map(product=>(
                                                <li 
                                                    key={product.id} 
                                                    value={product.id}
                                                    onClick={onChoiseProduct}
                                                    style={{ padding: 5, borderBottom: "1px solid lightgrey" }}
                                                    >
                                                        {product.name}
                                                    </li>
                                            ))}
                                        </ul>
                                    </div>
                                ):('')}
                        </div>
                    </div>

                    <div className='add_menu_position_wrapper'>
                        <div className='label'>
                            Name:
                        </div>
                        <div className="input_menu_position_wrapper">
                            <input
                                className="add_menu_position_input_feild"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={changeHandler}
                                autoComplete='off'
                            />
                        </div>
                            
                    </div>
                    
                    <div className="add_menu_position_wrapper">
                        <div className="label">
                            Volume: 
                        </div>
                        <div className="input_menu_position_wrapper">
                            <input
                                className='add_menu_position_input_feild volume'
                                type="number"
                                step={10.00}
                                min='0'
                                name="volume"
                                value={form.volume}
                                onChange={changeHandler}
                            />
                            <span>ml.</span>
                        </div>
                    </div>
                    
                    <div className="add_menu_position_wrapper">
                        <div className="label">
                            Sale price: 
                        </div>
                        <div className="input_menu_position_wrapper">
                            <input
                                className='add_menu_position_input_feild price'
                                type="number"
                                step={0.50}
                                min='0.00'
                                name="sale_price"
                                value={form.sale_price}
                                onChange={changeHandler}
                            />
                             <span>₪</span>
                        </div>
                    </div>
                    <div type="submit"  className='add_menu_position_submit_btn'>
                        <RegularButton lable={'Add'}></RegularButton>
                    </div>               
                </form>           
            </div>
        </div>
    )
}