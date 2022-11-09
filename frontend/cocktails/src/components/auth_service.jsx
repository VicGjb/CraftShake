import React from "react";

export function CheckAuth(){
    let refresh_token = localStorage.getItem('refresh_token')
    if (refresh_token){
        console.log('Ihave a refresh token',refresh_token)
        let refresh_token_data = JSON.parse(atob(refresh_token.split('.')[1]));
        console.log('refresh_token exp',refresh_token_data)
        let time_now = Math.ceil(Date.now() / 1000)
        console.log('date now',time_now)
        if (refresh_token_data.exp>time_now){
            console.log('hey')
            return true
        } else {
            console.log('refresh token is exp')
            return false
        }
    } else {
        console.log('i dont have refresh token')
        return false
    }
}