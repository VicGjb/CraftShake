import React, { useState } from 'react';
import {ReactComponent as Logo} from "../../svg/main_page_logo.svg"
import {ReactComponent as GoogleLogo} from "../../svg/google_logo.svg"
import { useEffect } from 'react';
import { NetworkManager } from '../../components/network_manager';
import { useNavigate } from 'react-router-dom';
import { AuthServise } from './auth_service';
import { useManeContext } from '../../components/main_context';
import { RegularButton } from '../../components/buttons/regular_button';
import { PopupRegularMessage } from '../../components/popup/popup_regular_message';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import '../../styles/login.scss'

export function SignIn() {
	let navigate = useNavigate();
    let main_context = useManeContext();
	let initialFormData = Object.freeze({
		username: '',
		password: '',
	});
    let network_manager = new NetworkManager()
    let auth_service = new AuthServise()
	let [formData, setFormData] = useState(initialFormData);
    let [externalPopup, setExternalPopup] = useState(null);
    let user = main_context.getUserFromMainContext()
    let access_token = localStorage.getItem('access_token')
    let [regular_message_active, setRegular_message_active] = useState(false)
    let [message, setMessage] = useState('')


    function onClickGoogle(){
        network_manager.GoogleLogIn()
        let top = window.screenY + (window.outerHeight - 400) / 2.5;
        let left = window.screenX + (window.outerWidth - 500) / 2;
        let url = network_manager.GoogleLogIn()
        let win=window.open(url,'qwe',`width=500, height=400, left=${left},top=${top}`)
        setExternalPopup(win)
    }

    useEffect(() => {
        console.log('Check user in login',main_context.getUserFromMainContext())
        if(user){
            console.log('i have user in login',user)
            if (user.role == 'counter'){
                console.log('go to placeList')  
                navigate(`/placeList/`)
                return;
            }else{
                console.log('go to my id',user)
                navigate(`/customer/${user.id}/`)
                return;
            }
        }else{
            if(access_token){
                let userId = auth_service.GetAccessTokenData().user_id
                network_manager.GetConfig(userId)
                    .then((response)=>{
                        main_context.setUserInMainContext(response.user)
                        main_context.setVolumesInMainContext(response.volumes)
                        console.log('Seting user in login')
                })
            }
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
      },
      [externalPopup, user]
    )

	function handleSubmit(form){
		console.log(form);
        network_manager.SingIn(form)
        .then(()=>{
            window.location.href='/'
        })  
        .catch(error => {
            console.log('dsdscsdcsd',error.response.status);
            if (error.response.status == 401){
                setMessage('Wrong login/password') 
                }
            else{
                setMessage('System problems, please try again later')
            }
            setRegular_message_active(true)
            throw error;
        });		
	};

	return (
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
                 validationSchema ={Yup.object({
                    username: Yup.string()
                        .required('Required'),
                    password:Yup.string()
                        .required('Required'),
                 })}
                >
                {({errors, touched, validateForm})=>(
                    <Form>
                        <div className='from_row'>
                            <div className='input_lable'>Username</div>
                            <div className="field-container">
                                <Field
                                required    
                                id="username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                />
                                {/* {errors.username && touched.username && <div className="field-error">{errors.username}</div>} */}
                            </div>
                        </div>
                        <div className='from_row'>
                            <div className='input_lable' >Password</div>
                            <div className="field-container">
                                <Field
                                    className='input_form'
                                    required
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                {/* {errors.password && touched.password && <div className="field-error">{errors.password}</div>} */}
                            </div>
                        </div>
                        <div className='submit_button_wraper_login'>
                            <RegularButton lable={'Login'} type='submit'/>
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
                            <div className="google_label">Login With Gooogle</div>  
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
);
}