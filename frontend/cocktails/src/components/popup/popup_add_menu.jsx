import React from "react";
import { useState } from "react";
import { RegularButton } from "../buttons/regular_button";
import { NetworkManager } from "../network_manager";
import { useParams } from "react-router-dom";
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import '../../styles/popup_add_menu.scss'

export function PopupAddMenu({add_menu_active, setAdd_menu_active ,setMenuList}){
    let {placeName} = useParams();
    let {placeId} = useParams();

    let network_manager = new NetworkManager()
    let defaultForm = {
        name:'',
        is_current_menu:false,
        place: placeId,
    };

    let [form, setForm] =  useState(defaultForm);;


    function submitHandler(form){

        network_manager.create_menu(form)
			.then(response => {
				console.log(response);
                setMenuList(response.data)
			})
			.catch(error => {
				console.log(error);
				throw error;
			});	
        setAdd_menu_active(false)
	
	}

    return(
        <div className={add_menu_active ? 'popup_mobile_wrapper active' : 'popup_mobile_wrapper'} onClick={()=>setAdd_menu_active(false)}>
            <div className="popup_mobile_content create_menu" onClick={e => e.stopPropagation()}>
                <div className="popup_filter_sevice_button_wrapper">
                    <div className="popup_filter_close_button" onClick={()=>{setAdd_menu_active(false)}}>
                        <CloseIcon className='close_button_icon'/>
                    </div> 
                </div>

                <div className="popup_title add_menu">
                    Add menu for {placeName}
                </div>
               
                <Formik
                    initialValues={form}
                    onSubmit={values=>{
                        submitHandler(values)
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .required('Required')
                            .max(50,'Too long, must be 50 characters or less')
                        
                    })}
                >
                    {({errors, touched, validateForm})=>(
                        <Form className="add_invoice_form">
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
                                    Curent:
                                </div>
                                <div className="field-container">
                                    <Field 
                                        className='is_current'
                                        type="checkbox"
                                        name="is_current_menu"
                                        />
                                </div>  
                            </div>    
                            <div type="submit" onClick={()=>{validateForm().then(()=>console.log('hey'))}} className='add_invoice_form_submit_btn'>
                                <RegularButton lable={"Create"} type='submit'/>
                            </div>                       

                        </Form>
                    )}

                </Formik>
                <div className="popup_footer">
                </div>
            </div>
        </div>
    )

}