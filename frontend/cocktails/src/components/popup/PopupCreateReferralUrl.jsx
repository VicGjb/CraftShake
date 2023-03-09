import React from "react";
import { useState } from "react";
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"
import { RegularButton } from "../buttons/regular_button";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { NetworkManager } from "../network_manager";
import { PopupRegularMessage } from "./popup_regular_message";
import { useManeContext } from "../main_context";
import '../../styles/popup_create_referral_url.scss'

export function PopupCreateReferralUrl({
    createReferallUrlActive, 
    setCreateReferallUrlActive, 
    }){
    let roles = ['counter','customer']
    let defaultForm = {
        role:'',
        place:'',
    }
    let mainContext = useManeContext()
    let places = mainContext.getPlaces
    let [referralCode, setReferralCode] = useState('') 
    let domain = process.env.REACT_APP_DOMAIN
    let referralUrl = `${domain}reregistration/${referralCode}`
    let networkManager = new NetworkManager()
    let [regular_message_active, setRegular_message_active] = useState(false)
    function submitHandler(form){
        networkManager.CreateReferralUrl(form)
        .then(response=>{
            console.log(response.code)
            setReferralCode(response.code)
            setRegular_message_active(true)
        })
    }
    return(
        <div className={createReferallUrlActive ? 'popup_mobile_wrapper active' : 'popup_wrapper'} onClick={()=>setCreateReferallUrlActive(false)}>
            <div className="popup_mobile_content_add_menu_position" onClick={e => e.stopPropagation()}>
                <div className="popup_filter_sevice_button_wrapper">
                    <div className="popup_filter_close_button" onClick={()=>{setCreateReferallUrlActive(false)}}>
                        <CloseIcon className='close_button_icon'/>
                    </div> 
                </div>
                <div className="popup_title add_menu_position">
                    Create referral URL
                </div>

                <Formik
                    initialValues={defaultForm}
                    onSubmit={values=>{
                        //console.log(values)
                        submitHandler(values)
                    }}
                    validationSchema = {Yup.object({
                        role: Yup.string()
                            .required('Required')
                            .max(50,'Too long, must be 50 characters or less'),
                        place: Yup.string()  
                            .when('role',{
                                is:(role)=> role === 'customer',
                                then:Yup.string().required("Required"),
                                otherwise:Yup.string().notRequired()
                            })
                    })}
                >
                    {({errors,touched,validateForm})=>(
                        <Form className='add_manager_form'>
                            <div className='add_place_input_wrapper'>
                                <div className='add_place_input_labele'>
                                    Role:
                                </div>
                                <div className="field-container">
                                    <Field 
                                        name='role' 
                                        className='place-name-ref'
                                        as='select'
                                        >
                                            <option value=''></option>
                                            {roles.map(role=>(
                                                <option value={role} key={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                                            ))}
                                        </Field>
                                    {errors.role && touched.role && <div className="field-error">{errors.role}</div>}
                                </div>  
                            </div>

                            <div className='add_place_input_wrapper'>
                                <div className='add_place_input_labele'>
                                    Place:
                                </div>
                                <div className="field-container">
                                    <Field 
                                        name='place' 
                                        className='place-name-ref'
                                        as='select'
                                        >
                                        <option value=''></option>
                                        {places.map(place => (
                                        <option value={place.id} key={place.id}>{place.name}</option>
                                        ))}
                                        </Field>
                                    {errors.place && touched.place && <div className="field-error">{errors.place}</div>}
                                   
                                </div>  
                            </div>

                            <div className='submit_button add_place' onClick={()=>{validateForm().then(()=>console.log('hey'))}}>
                                    <RegularButton lable={'Create'} type='submit'/>
                            </div>
                        </Form>
                    )}
                </Formik>
            <PopupRegularMessage 
                message={`Url: ${referralUrl}`}
                regular_message_active={regular_message_active}
                setRegular_message_active={setRegular_message_active}
            />
            </div>
        </div>
    )
}