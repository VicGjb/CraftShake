import React, { Component, useEffect, useState } from 'react';
import { NetworkManager } from '../../components/network_manager';
import { RegularButton } from '../../components/buttons/regular_button';
import { useNavigate } from 'react-router-dom';

export function AddPlace() {
	let defaultForm = {
        name:'',
        address:'',
        phone:'',
        email:'',
        is_current_place:true,
    }
    let navigate = useNavigate()
	let [form, setForm] =  useState(defaultForm);
    let network_manager = new NetworkManager()
	let changeHandler = e => {
		setForm({...form, [e.target.name]:e.target.value})
	}
	let submitHandler = e => {
		e.preventDefault()
        network_manager.create_place(form)
			.then(response => {
				console.log(response);
				setForm(defaultForm);
			})
			.catch(error => {
				console.log(error);
				throw error;
			});		
            window.location.reload()
	}
	return (
		<div>
			<form onSubmit={submitHandler} className='add_place_form'>

                <div className='add_place_input_wrapper'>
                    <div className='add_place_input_labele regular_text_small'>
                        Name:
                    </div>
                    <input
                        className='name'
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={changeHandler}
                    />
                </div>
                <div className='add_place_input_wrapper'>
                    <div className='add_place_input_labele regular_text_small'>
                        Addres:
                    </div>
                    <input
                        className='addres'
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={changeHandler}
                    />
                </div>
                <div className='add_place_input_wrapper'>
                    <div className='add_place_input_labele regular_text_small'>
                        Phone:
                    </div>
                    <input
                        className='phone'
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={changeHandler}
                    />
                </div>
                <div className='add_place_input_wrapper'>
                    <div className='add_place_input_labele regular_text_small'>
                        Email:
                    </div>
                    <input
                        className='email'
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={changeHandler}
                    />
                </div>
                <div className='add_place_input_wrapper current_checkbox'>
                    <div className='add_place_input_labele regular_text_small'>
                        Current:
                    </div>
                    <input
                        className='current_checkbox'
                        type="checkbox"
                        name="current"
                        value={form.is_current_place}
                        checked={form.is_current_place}
                        onChange={() => setForm(prev=> ({...prev, is_current_place: !prev.is_current_place}))}
                    />
                </div>
				<div className='submit_button' type="submit">
                    <RegularButton lable={'Add'}/>
                </div>
			</form>
		</div>
	)
}