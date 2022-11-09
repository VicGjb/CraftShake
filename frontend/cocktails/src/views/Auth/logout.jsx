import React from 'react';
import { NetworkManager } from '../../components/network_manager';
import { useNavigate } from 'react-router-dom';

export function Logout() {
	let navigate = useNavigate();
    let network_manager = new NetworkManager()
    function Logout_1(){
        let response = network_manager.LogOut()
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login/'
        // navigate('/login/',{replace:false})
    }
	
    return (
        <button onClick={Logout_1}>Logot</button>
    )
}