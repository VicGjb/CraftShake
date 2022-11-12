import React, { useState } from 'react';
import { useEffect } from 'react';
import { NetworkManager } from '../../components/network_manager';
import { useNavigate } from 'react-router-dom';
import { PopupGoogleLogin } from '../../components/popup/popup_google_login';
import { AuthServise } from './auth_service';



export function SignIn() {
	let navigate = useNavigate();
	let initialFormData = Object.freeze({
		username: '',
		password: '',
	});
    let [google_login_active, setGoogle_login_active] = useState(false)
    let network_manager = new NetworkManager()
    let auth_service = new AuthServise()
	let [formData, setFormData] = useState(initialFormData);
    let [externalPopup, setExternalPopup] = useState(null);
	let handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};  

    function onClickGoogle(){
        console.log('her')
        network_manager.GoogleLogIn()
        let top = window.screenY + (window.outerHeight - 400) / 2.5;
        let left = window.screenX + (window.outerWidth - 500) / 2;
        let url = network_manager.GoogleLogIn()
        let win=window.open(url,'qwe',`width=500, height=400, left=${left},top=${top}`)
        setExternalPopup(win)
    }

    useEffect(() => {
        let access_token = localStorage.getItem('access_token')
        if(access_token){
            let userId = auth_service.GetAccessTokenData().user_id
            console.log('IDD',userId)
            network_manager.GetUserData(userId)
                .then(user=>{
                    console.log('user',user)
                    if (user.role_name == 'counter'){
                        window.location.href = `/placeList/`
                        return;
                        // console.log('go to placeList')
                    }else{
                        window.location.href = `/${userId}`
                        return;
                        // console.log('go to my id')
                    }
                })
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
      [externalPopup]
    )
 


	let handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
        network_manager.SingIn(formData)
        .then(response=>{
            console.log("LOGIN RESPONSE", response)
            let userId = auth_service.GetTokenData(response.data.refresh).user_id
            network_manager.GetUserData(userId)
            .then(user=>{
                console.log('user',user)
                if (user.role_name == 'counter'){
                    window.location.href = `/placeList/`
                    // console.log('go to placeList')
                }else{
                    window.location.href = `/${userId}`
                    // console.log('go to my id')
                }
            })          
            }       
        )
        .catch(error => {
            console.log(error);
            throw error;
        });		
	};

    function getTokens(){
        console.log('access_token',localStorage.getItem('access_token'))
        console.log('refresh_token',localStorage.getItem('refresh_token'))
        let access_token_data = auth_service.GetAccessTokenData()
        console.log('access token data', access_token_data)
    }

	return (
        <div>
            <form className='add_product_form' noValidate>
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
            <button onClick={getTokens}> get tokens</button>
            <PopupGoogleLogin google_login_active={google_login_active}  setGoogle_login_active={setGoogle_login_active}/>
        </div>
);
}