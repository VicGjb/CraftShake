import React from "react";
import { NetworkManager } from "../../api/network_manager";
import { useState } from "react";
import { RegularButton } from "../buttons/regular_button";
import {useParams } from "react-router-dom";
import { PopupRegularMessage } from "./popup_regular_message";
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"
import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup'
import '../../styles/popup_add_invoice.scss'

export function PopupAddInvoice({add_invoice_active, setAdd_invoice_active,setInvoices}){
    let {placeId} = useParams();
    let {placeName} = useParams();
    let defaultForm = {
        place: placeId,
        date:'',
        from_date:'',
        until_date:'',
        is_vat:false,
    }
    let network_manager = new NetworkManager()
    let [form, setForm] = useState(defaultForm);
    let [regular_message_active, setRegular_message_active] = useState(false)


    function submitHandler(form){
        //console.log('submit_form',form)
        network_manager.create_invoice(form)
            .then(response=>{
                //console.log('sss',response);
                setInvoices(response.data)
                setAdd_invoice_active(false)
            })
            .catch(error => {
                //console.log('Iam ERROR',error);
                raiseErrorMessage()
                throw error;
            });
            
    }

    function raiseErrorMessage(){
        setRegular_message_active(true)
    }

    return(
        <div className={add_invoice_active ? 'popup_mobile_wrapper active' : 'popup_mobile_wrapper'} onClick={()=>{setAdd_invoice_active(false)}}>
            <div className="popup_mobile_content_create_invoice" onClick={e => e.stopPropagation()}>  
                <div className="popup_filter_sevice_button_wrapper">
                    <div className="popup_filter_close_button" onClick={()=>{setAdd_invoice_active(false)}}>
                        <CloseIcon className='close_button_icon'/>
                    </div> 
                </div>
                <div className="add_invoice_title">
                    Create invoice for {placeName}
                </div>
                <Formik
                     initialValues={form}
                     onSubmit={values=>{
                         submitHandler(values)
                     }}
                     validationSchema = {Yup.object({
                        from_date: Yup.date()
                            .required('Required'),
                        until_date:Yup.date()
                                .min(Yup.ref('from_date'), 'This date must be later than From date')
                                .required('Requires'),
                        date: Yup.date()
                                .min(Yup.ref('until_date'), 'This date must be later than Until date')
                                .required('Required'),
                        
                     })}
                    >
                    {({errors, touched, validateForm})=> (
                        <Form className="add_invoice_form">
                            <div className="add_invoice_form_date from">
                                <div className="add_invoice_form_date_lable">
                                    From
                                </div>  
                                <div className="field-container">
                                    <Field 
                                        className="date_input"
                                        type='date'
                                        name='from_date'
                                    />
                                    {errors.from_date && touched.from_date && <div className="field-error">{errors.from_date}</div>}
                                </div>
                            </div>

                            <div className="add_invoice_form_date to">
                                <div className="add_invoice_form_date_lable">
                                    Until
                                </div>
                                <div className="field-container">
                                    <Field 
                                        className="date_input"
                                        type='date'
                                        name='until_date'
                                    />
                                    {errors.until_date && touched.until_date && <div className="field-error">{errors.until_date}</div>}

                                </div>
                            </div>
                            
                            <div className="add_invoice_form_date from">
                                <div className="add_invoice_form_date_lable">
                                    Date
                                </div>
                                <div className="field-container">
                                    <Field 
                                        className="date_input"
                                        type='date'
                                        name='date'
                                    />
                                    {errors.date && touched.date && <div className="field-error">{errors.date}</div>}
                                </div>
                            </div>

                            

                            <div className="add_invoice_form_date to">
                                <div className="add_invoice_form_date_lable">
                                    Add VAT:
                                </div>
                                <div className="field-container">
                                    <Field 
                                        className="checkbox_input"
                                        type='checkbox'
                                        name='is_vat'
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
            <PopupRegularMessage
                message={'There are no orders for these date'}
                regular_message_active = {regular_message_active}
                setRegular_message_active = {setRegular_message_active}
            />
        </div>
    )
}