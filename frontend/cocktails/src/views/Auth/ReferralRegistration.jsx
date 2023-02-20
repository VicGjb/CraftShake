import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Formik,Field,Form } from "formik";
import * as Yup from 'yup';
import { NetworkManager } from "../../components/network_manager";
import { RegularButton } from "../../components/buttons/regular_button";
import { PopupRegularMessage } from "../../components/popup/popup_regular_message";
import {ReactComponent as GoogleLogo} from "../../svg/google_logo.svg"
import {ReactComponent as Logo} from "../../svg/main_page_logo.svg"


export function ReferralRegistration(){
    let {referralCode} = useParams()
    let networkManager = new NetworkManager();
    let initialFormData = Object.freeze({
		email: '',
		password: '',
        passwordRepeat:'',
        referral_code: referralCode
	});
    let [formData, setFormData] = useState(initialFormData);
    let [regular_message_active, setRegular_message_active] = useState(false)
    let [externalPopup, setExternalPopup] = useState(null);
    let [message, setMessage] = useState('')
    

    function onClickGoogle(){
        networkManager.GoogleLogIn()
        let top = window.screenY + (window.outerHeight - 400) / 2.5;
        let left = window.screenX + (window.outerWidth - 500) / 2;
        let url = networkManager.GoogleLogIn()
        let win=window.open(url,'qwe',`width=500, height=400, left=${left},top=${top}`)
        setExternalPopup(win)
    }

    useEffect(()=>{
        if (referralCode){
            localStorage.setItem('referralCode',referralCode)
        }

        if (!externalPopup) {
            return;
          }else{
          let timer = setInterval(() => {
              if(externalPopup.closed){
                  window.location.href='/'
              return;  
              }
              }, 500)
          }    
    }, [externalPopup])


    function handleSubmit(form){
        networkManager.ReferralRegistration(form)
        .then((response) => {
            window.location.href='/'
            console.log('response',response)
            networkManager.SingIn(form)
            .then(response =>{
                window.location.href='/'
            })
        })
        console.log('Ok')
    }
    return(
        <div>
            <div className='wrapper_login'>
                <div className='logo_wrapper'>
                <Logo className='logo'/> 
                </div>

                <Formik
                 initialValues={formData}
                 onSubmit={values=>{
                    handleSubmit(values) 
                 }}
                 validationSchema = {Yup.object({
                email: Yup.string()
                    .required('Required'),
                password: Yup.string()
                    .required('Required'),
                passwordRepeat: Yup.string()
                    .required('Required')
                    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
                })}
                >
                {({errors, touched, validateForm})=>(
                    <Form>
                        <div className='from_row'>
                            <div className='input_lable'>Email</div>
                            <div className="field-container">
                                <Field
                                className='input_login'
                                required    
                                id="email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                />
                                {/* {errors.email && touched.email && <div className="field-error">{errors.email}</div>} */}
                            </div>
                        </div>
                        <div className='from_row'>
                            <div className='input_lable' >Password</div>
                            <div className="field-container">
                                <Field
                                    className='input_login'
                                    required
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                {errors.password && touched.password && <div className="field-error">{errors.password}</div>}
                            </div>
                        </div>
                        <div className='from_row'>
                            <div className='input_lable' >Repeat pass</div>
                            <div className="field-container">
                                <Field
                                    className='input_login'
                                    required
                                    name="passwordRepeat"
                                    label="passwordRepeat"
                                    type="password"
                                    id="passwordRepeat"
                                    autoComplete="current-password"
                                />
                                {errors.passwordRepeat && touched.passwordRepeat && <div className="field-error">{errors.passwordRepeat}</div>}
                            </div>
                        </div>

                        <div className='submit_button_wraper_login'>
                            <RegularButton lable={'SignUp'} type='submit'/>
                        </div>

                          
                    </Form>
                )}
                </Formik> 

                <div className='google_login_row'>                            
                    <button className="google_btn" onClick={onClickGoogle}>
                        <div className="google_logo_wrapper">
                            <div className="google_logo">
                                <GoogleLogo/>
                            </div>
                        </div>
                        <div className="google_labal_wrapper">
                            <div className="google_label">Login With Google</div>  
                        </div>
                    </button>
                </div>  
            </div>  
            <PopupRegularMessage
                message = {message} 
                regular_message_active={regular_message_active}
                setRegular_message_active={setRegular_message_active} 
            
            />
        </div>
    )
}