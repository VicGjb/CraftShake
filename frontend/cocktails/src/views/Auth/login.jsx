import React, { useState } from 'react';
import { axiosInstance } from '../../components/axios';
import { useNavigate } from 'react-router-dom';



export default function SignIn() {
	const navigate = useNavigate();
	const initialFormData = Object.freeze({
		username: '',
		password: '',
	});

	const [formData, setFormData] = useState(initialFormData);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};  

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance
			.post(`token/`, {
				username: formData.username,
				password: formData.password,
			})
			.then((res) => {
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
                navigate('/placeList');
				console.log(res);
				console.log(res.data);
			});
	};

	return (
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
);
}