import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../components/axios';
import { useNavigate } from 'react-router-dom';

export function Logout() {
	const navigate = useNavigate();

    function Logout_1(){
        // useEffect(() => {
            const response = axiosInstance.post('counter/logout/blacklist/', {
                refresh_token: localStorage.getItem('refresh_token'),
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            navigate('/login');
        // });  
    }
	
    return (
        <button onClick={Logout_1}>Logot</button>
    )
}