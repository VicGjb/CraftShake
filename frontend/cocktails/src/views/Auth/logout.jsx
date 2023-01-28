import React from 'react';
import { NetworkManager } from '../../components/network_manager';
import { useNavigate } from 'react-router-dom';

export function Logout() {
	let navigate = useNavigate();
    let network_manager = new NetworkManager()
    function Logout_1(){
        network_manager.LogOut()
        .then(response => {
            console.log(response)
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login/' 
        })
    }
	
    return (
        <button onClick={Logout_1}>Logout</button>
    )
}