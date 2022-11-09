import React, { useState } from 'react';
import { useEffect } from 'react';
import { NetworkManager } from '../../components/network_manager';
import { useNavigate } from 'react-router-dom';
import { PopupGoogleLogin } from '../../components/popup/popup_google_login';


export default function SignIn() {
	let navigate = useNavigate();
	let initialFormData = Object.freeze({
		username: '',
		password: '',
	});
    let [google_login_active, setGoogle_login_active] = useState(false)
    let network_manager = new NetworkManager()
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
        // window.location.href = url
        let win=window.open(url,'qwe',`width=500, height=400, left=${left},top=${top}`)
        setExternalPopup(win)
    }

    useEffect(() => {
        if (!externalPopup) {
          return;
        }else{
        let timer = setInterval(() => {
            if(externalPopup.closed)
            window.location.href = '/placeList/'
            // navigate('/placeList')
            return;
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
            window.location.href = '/placeList/'
            // console.log(response);
            // console.log(response.data);           
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