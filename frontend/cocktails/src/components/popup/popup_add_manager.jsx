import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { RegularButton } from "../buttons/regular_button";
import { NetworkManager } from "../network_manager";
import { useManagersContext } from "../../views/ManagersList/ManagersContext";
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import '../../styles/popup_add_manager.scss'


export function PopupAddManager({add_manager_active, setAdd_manager_active, manager}){
    let {placeName} = useParams();
    let {placeId} = useParams();
    let networkManager = new NetworkManager()
    let managersContext = useManagersContext()
	let defaultForm = setDefaultForm()
    let [form, setForm] =  useState(defaultForm);
    let phoneRegularExpression = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)$/
    

    function setDefaultForm(){
        
        if(manager){
            return(
                {
                name: manager.name,
                phone: manager.phone,
                description: manager.description,
                place: placeId,
            })
        }else{
            return({
                    name:'',
                    phone:'',
                    description:'',
                    place:placeId,
                })
        }
    }

    function submitHandler(form) {
        if(manager){
            networkManager.update_manager(manager.id,form)
            .then(response => {
                managersContext.setManagersList(response);
            })
            .catch(error => {
                console.log(error);
                throw error;
            })
            setAdd_manager_active(false)
        }else{
            networkManager.create_manager(form)
			.then(response => {
                managersContext.setManagersList(response)
				console.log('response',managersContext.getManagersList);
			})
			.catch(error => {
				console.log(error);
				throw error;
			});		
            setAdd_manager_active(false)
        }
        
        }
        
    return(
        <div className={add_manager_active ? 'popup_mobile_wrapper active' : 'popup_wrapper'} onClick={()=>setAdd_manager_active(false)}>
            <div className="popup_mobile_content add_manager" onClick={e => e.stopPropagation()}>
                <div className="popup_filter_sevice_button_wrapper">
                    <div className="popup_filter_close_button" onClick={()=>{setAdd_manager_active(false)}}>
                        <CloseIcon className='close_button_icon'/>
                    </div> 
                </div>
                
                
                <div className="popup_title add_manager">
                    {manager ? `Update manager  ${manager.name}`:`Add manager for ${placeName}`}
                </div>


                <Formik
                    initialValues={form}
                    onSubmit={values=>{
                        console.log(values)
                        submitHandler(values)
                    }}
                    validationSchema = {Yup.object({
                        name: Yup.string()
                            .required('Required')
                            .max(50,'Too long, must be 50 characters or less'),
                        phone: Yup.string()
                            .matches(phoneRegularExpression,"That doesn't look like a phone number")    
                            .max(13,'Too long for phone number')                    
                            // .typeError("That doesn't look like a phone number")
                            // .positive("A phone number can't start with a minus")
                            // .integer("A phone number can't include a decimal point")
                            .required('Required'),
                        description: Yup.string()
                            .max(500,'Too long, must be 500 characters or less'),
                    })}
                >
                    {({errors,touched,validateForm})=>(
                        <Form className='add_manager_form'>
                            <div className='add_place_input_wrapper'>
                                <div className='add_place_input_labele'>
                                    Name:
                                </div>
                                <div className="field-container">
                                    <Field 
                                        name='name' 
                                        className='name'
                                        />
                                    {errors.name && touched.name && <div className="field-error">{errors.name}</div>}
                                </div>  
                            </div>

                            <div className='add_place_input_wrapper'>
                                <div className='add_place_input_labele'>
                                    Phone:
                                </div>
                                <div className="field-container">
                                    <Field 
                                        name='phone' 
                                        className='phone'
                                        // value={phone}
                                        />
                                    {errors.phone && touched.phone && <div className="field-error">{errors.phone}</div>}
                                   
                                </div>  
                            </div>

                            <div className='add_place_input_wrapper'>
                                <div className='add_place_input_labele'>
                                    Description:
                                </div>
                                <div className="field-container">
                                    <Field 
                                        name='description' 
                                        className='description_input'
                                        component = 'textarea'
                                        type = 'text'
                                        />
                                    {errors.description && touched.description && <div className="field-error">{errors.description}</div>}
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