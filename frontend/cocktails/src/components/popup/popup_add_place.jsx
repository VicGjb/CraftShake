import React, { useEffect } from "react";
import { useState } from "react";
import { useManeContext } from "../main_context";
import { RegularButton } from "../buttons/regular_button";
import { NetworkManager } from '../../components/network_manager';
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"
import { Formik, Form, Field } from 'formik';
import '../../styles/popup_add_place.scss'

export function PopupAddPlace({add_place_active, setAdd_place_active, setPlaces, newPlace}){
    let emptyForm = {
        name:'',
        address:'',
        phone:'',
        email:'',
        is_current_place:true,
    }
    let mainContext = useManeContext();
    let placeContext = mainContext.getPlace
    let defaultForm = setDefaultForm()
	let [form, setForm] =  useState(defaultForm);
    let networkManager = new NetworkManager();
    
    
    function setDefaultForm(){
        if(newPlace){
            return(
                    emptyForm
                )
        }else{
            return( {
                name:placeContext.name,
                address:placeContext.address,
                phone:placeContext.phone,
                email:placeContext.email,
                is_current_place:placeContext.is_current_place,
                }
            )
        }
    }
    function validateName(value){
        let error;
        if(value.length>40){
            error = 'Too long'
        }
        return error;
    }
    function validateEmail(value){
        let error;
        if(!value){
            error = 'Required'
        }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)){
            error = 'Invalid email address'
        }
        return error;
    }
    function validateAddress(value){
        let error;
        if(!value){
            error = 'Required'
        }else if (value.length>50){
            error = 'Too long'
        }
        return error;
    }
    function validatePhone(value){
        let error;
        if(!value){
            error = 'Required'
        }else if (!isFinite(value)){
            error = 'invalid phone number'
        }else if (value.length>12){
            error = 'invalid phone number'
        }
        return error;
    }







    let changeHandler = e => {
		setForm({...form, [e.target.name]:e.target.value})
        console.log('form',form)
	}

	function submitHandler(form){
        if(newPlace){
            networkManager.create_place(form)
			.then(response => {
                setPlaces(response)
				// setForm(emptyForm);
			})
			.catch(error => {
				console.log(error);
				throw error;
			});		
            setAdd_place_active(false)

        }else{
            networkManager.change_place(placeContext.id, form)
            .then(response => {
                mainContext.setPlace(response.data)
                setForm(emptyForm)
            })
            .catch(error => {
                console.log(error);
                throw error;
            });		
            setAdd_place_active(false)
        }        
	}

    return(
        <div className={add_place_active ? 'popup_mobile_wrapper active' : 'popup_mobile_wrapper'} onClick={()=>{setAdd_place_active(false)}}>
            <div className="popup_mobile_content add_place" onClick={e => e.stopPropagation()}>
                <div className="popup_filter_sevice_button_wrapper">
                    <div className="popup_filter_close_button" onClick={()=>{setAdd_place_active(false)}}>
                        <CloseIcon className='close_button_icon'/>
                    </div> 
                </div>
                
                
                <div className="popup_title add_place">
                    {newPlace? `Add new place`: `Change place " ${placeContext.name} "`}
                </div>

                <Formik
                        initialValues={form}
                        onSubmit={values=>{
                            console.log('hey hey',values)
                            submitHandler(values)
                        }}
                    >
                        {({errors, touched, validateForm})=> (
                            <Form className="add_place_form">
                                <div className='add_place_input_wrapper'>
                                    <div className='add_place_input_labele'>
                                        Name:
                                    </div>
                                    <div className="field-container">
                                        <Field 
                                            name='name' 
                                            validate={validateName}
                                            className='name'
                                            />
                                        {errors.name && touched.name && <div className="field-error">{errors.name}</div>}
                                    </div>  
                                </div>
                                

                                <div className='add_place_input_wrapper'>
                                    <div className='add_place_input_labele'>
                                        Email:
                                    </div>
                                    <div className="field-container">
                                        <Field name='email' validate={validateEmail}/>
                                        {errors.email && touched.email && <div className="field-error">{errors.email}</div>}
                                    </div>
                                    
                                </div>
                                

                                <div className='add_place_input_wrapper'>
                                    <div className='add_place_input_labele'>
                                        Address:
                                    </div>
                                    <div className="field-container">
                                        <Field name='address' validate={validateAddress}/>
                                        {errors.address && touched.address && <div className="field-error">{errors.address}</div>}
                                    </div>
                                </div>
                                

                                <div className='add_place_input_wrapper'>
                                    <div className='add_place_input_labele'>
                                        Phone:
                                    </div>
                                    <div className="field-container">
                                        <Field name='phone' validate={validatePhone}/>
                                        {errors.phone && touched.phone && <div className="field-error">{errors.phone}</div>}
                                    </div>
                                </div>
                                
                                <div className='add_place_input_wrapper'>
                                    <div className='add_place_input_labele'>
                                        Current:
                                    </div>
                                    <div className="field-container curretn-place">
                                        <Field name='is_current_place' type='checkbox'/>
                                    </div>
                                </div>
                                <div className='submit_button add_place' onClick={()=>{validateForm().then(()=>console.log('hey'))}}>
                                    <RegularButton lable={'Accept'} type='submit'/>
                                </div>
                            </Form>
                        )}
                </Formik>
            </div>
        </div>
    )
}