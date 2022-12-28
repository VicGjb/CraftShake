import React from "react";
import { useState } from "react";
import { NetworkManager } from '../../components/network_manager';
import { RegularButton } from '../../components/buttons/regular_button';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
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
    function submitHandler(form){
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

                
                <Formik
                    initialValues={form}
                    onSubmit={values => {
                        submitHandler(values)
                    }}
                    validationSchema = {Yup.object({
                        name: Yup.string()
                            .required('Required')
                            .max(50,'Too long, must be 50 characters or less'),
                        description: Yup.string()
                            .max(500,'Too long, must be 500 characters or less'),
                        cost_price: Yup.number()
                            .required('Required')
                            .min(0.01, 'Must be more than 0'),
                        sale_price:Yup.number()
                            .required('Requires')
                            .min(Yup.ref('cost_price'), 'Must be more then cost price'),

                    })}>


                        {({errors, touched, validateForm})=>(
                        <Form className='add_invoice_form'>
                            <div className='add_place_input_wrapper'>
                                <div className='add_place_input_labele'>
                                    Name:
                                </div>
                                <div className="field-container">
                                    <Field 
                                        className="name"
                                        type="text"
                                        name="name"
                                        />
                                    {errors.name && touched.name && <div className="field-error">{errors.name}</div>}
                                </div>  
                            </div>
                            <div className='add_place_input_wrapper'>
                                <div className='add_place_input_labele'>
                                    Description:
                                </div>
                                <div className="field-container">
                                    <Field 
                                        className="description_input"
                                        component = 'textarea'
                                        type = 'text'
                                        name="description"
                                        />
                                    {errors.description && touched.description && <div className="field-error">{errors.description}</div>}
                                </div>  
                            </div>
                            <div className='add_place_input_wrapper'>
                                <div className='add_place_input_labele'>
                                    Cost price:
                                </div>
                                <div className="field-container">
                                    <Field 
                                        className="price"
                                        type="number"
                                        name="cost_price"
                                        />
                                    {errors.cost_price && touched.cost_price && <div className="field-error">{errors.cost_price}</div>}
                                </div>  
                            </div>
                            <div className='add_place_input_wrapper'>
                                <div className='add_place_input_labele'>
                                    Sale price:
                                </div>
                                <div className="field-container">
                                    <Field 
                                        className="price"
                                        type="number"
                                        name="sale_price"
                                        />
                                    {errors.sale_price && touched.sale_price && <div className="field-error">{errors.sale_price}</div>}
                                </div>  
                            </div>
                            <div type="submit" onClick={()=>{validateForm().then(()=>console.log('hey'))}} className='add_invoice_form_submit_btn'>
                                <RegularButton lable={"Create"} type='submit'/>
                            </div>
                        </Form>

                        )}
                </Formik>
            </div>
        </div>
    )
}