import React from "react";
import { useMainContext } from "../../router/main_context";


export class AuthServise{
    
    constructor(){
            this.access_token = localStorage.getItem('access_token')
            this.refresh_token = localStorage.getItem('refresh_token')    
        }

    GetRefreshTokenData(){
        if (this.refresh_token){
            let refresh_token_data = JSON.parse(atob(this.refresh_token.split('.')[1]));
            return refresh_token_data
        }
    }
    GetAccessTokenData(){
        if (this.access_token){
            let access_token_data = JSON.parse(atob(this.access_token.split('.')[1]));
            return access_token_data
        }
    }
    GetTokenData(token){
        return JSON.parse(atob(token.split('.')[1]));
    }
    
    CheckAuth(){

        if (this.refresh_token){
            //console.log('I have a refresh token')
            let refresh_token_data = this.GetRefreshTokenData()
            //console.log('refresh_token exp',refresh_token_data)
            let time_now = Math.ceil(Date.now() / 1000)
            //console.log('date now',time_now)
            if (refresh_token_data.exp>time_now){
                //console.log('refresh token not expired')
                return true
            } else {
                //console.log('refresh token is expired')
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                return false
            }
        } else {
            //console.log('i dont have refresh token')         
            // window.location.href = '/login'
            return false
        }
    }
}
    