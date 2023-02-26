import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { NetworkManager } from "../../components/network_manager";

export function GetCodeGoogleLogin(){
    let network_manager = new NetworkManager()
    let search = useLocation().search;
    let code = new URLSearchParams(search).get('code');
    // let [referralCode, setReferralCode] = useState('');
    let referralCode = localStorage.getItem('referralCode')
    
    useEffect(()=>{
        // if (localStorage.getItem('referralCode')){
        //     console.log('i have referance code', referralCode)
        //     network_manager.GooglePain(code, referralCode)
        //     .then((response)=>{
        //     console.log('RESPONSE',response)
        //     console.log('access_token',localStorage.getItem('access_token'))
        //     console.log('refresh_token',localStorage.getItem('refresh_token'))
        //     window.close()
        // })
        // }else{
        //     console.log('i DONT have referance code', referralCode)
        //     network_manager.GooglePain(code, '')
        //     .then((response)=>{
        //     console.log('RESPONSE',response)
        //     console.log('access_token',localStorage.getItem('access_token'))
        //     console.log('refresh_token',localStorage.getItem('refresh_token'))
        //     window.close()
        // })
        // }
        console.log('code', code)
        
    })

}