import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NetworkManager } from "../../components/network_manager";

export function GetCodeGoogleLogin(){
    let network_manager = new NetworkManager()
    let search = useLocation().search;
    let code = new URLSearchParams(search).get('code');
    

    useEffect(()=>{
        console.log("code",code)
        network_manager.GooglePain(code)
        .then((response)=>{
            console.log('RESPONSE',response)
            console.log('access_token',localStorage.getItem('access_token'))
            console.log('refresh_token',localStorage.getItem('refresh_token'))
            // window.location.href = '/placeList/'
            window.close()
        })
    })

}