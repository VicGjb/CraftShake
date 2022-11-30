import React, { useState } from 'react';
import {ReactComponent as Logo} from "../../svg/main_page_logo.svg"
import {ReactComponent as GoogleLogo} from "../../svg/google_logo.svg"
import { useEffect } from 'react';
import { NetworkManager } from '../../components/network_manager';
import { useNavigate } from 'react-router-dom';
import { AuthServise } from './auth_service';
import { useManeContext } from '../../components/main_context';
import { RegularButton } from '../../components/buttons/regular_button';
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



	let handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};  
   


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
            if (user.role_name == 'counter'){
                console.log('go to placeList')  
                navigate(`/placeList/`)
                return;
            }else{
                console.log('go to my id',user)
                navigate(`/${user.id}/`)
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
                window.location.reload()
            return;  
            }
            }, 500)
        }    
      },
      [externalPopup,user]
    )

	let handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
        network_manager.SingIn(formData)
        .then(()=>{
            window.location.reload()
        })  
        .catch(error => {
            console.log(error);
            throw error;
        });		
	};

	return (
        <div>
            <div className='wrapper_login'>
                <div className='logo_wrapper'>
                <Logo className='logo'/> 
                </div>
                <form className='login_form'>
                    <div className='from_row'>
                        <div className='input_lable'>Username</div>
                        <input
                        required    
                        id="username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={handleChange}
                        />
                    </div>
                    <div className='from_row'>
                        <div className='input_lable' >Password</div>
                        <input
                            className='input_form'
                            required
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                    </div>
                    <div
                        className='submit_button_wraper_login'
                        onClick={handleSubmit}
                        type="submit"
                    >
                        <RegularButton lable={'Sing in'}/>
                    </div>
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
                </form>
        
            </div>















            
            {/* <form className='add_product_form' noValidate>
                <input
                    className='add_product_input_wrapper'
                    required
                    
                    id="username"
                    label="Email Address"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={handleChange}
                />
                <input
                    required
                    
                    className='add_product_input_wrapper'
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                />
                <button
                    className='add_product_submit_btn'
                    type="submit"

                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Sign In
                </button>
            </form>
            <button onClick={onClickGoogle}>Login With Gooogle</button>
            <div> </div>
            <div> </div>
            <button onClick={getTokens}> get tokens</button> */}
        </div>
);
}