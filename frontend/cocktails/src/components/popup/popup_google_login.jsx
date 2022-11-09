import React from "react";
import { NetworkManager } from "../network_manager";

export function PopupGoogleLogin({google_login_active, setGoogle_login_active}){
    let network_manager = new NetworkManager()

    function GoogleSingIn(){
        network_manager.GoogleLogIn()
        .then(response=>{
            console.log("LOGIN RESPONSE", response)
            // window.location.href = '/placeList/'
            // console.log(response);
            // console.log(response.data);           
            }       
        )
        .catch(error => {
            console.log(error);
            throw error;
        });		

        return(
            console.log('Privet')
        )
    }

    return(
        <div className={google_login_active ? 'popup_wrapper active' : 'popup_wrapper'} onClick={()=>setGoogle_login_active(false)}>
            <div className="popup_content place_popup" onClick={e => e.stopPropagation()}>
            </div>
        </div>
    )
}