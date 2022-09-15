import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RegularButton } from '../../components/buttons/regular_button';

export function AddMenu({place,  setAdd_menu_active}) {
	let defaultForm = {
        name:'',
        is_current_menu:false,
        place:place.id,
    }
    let [form, setForm] =  useState(defaultForm);
    let navigate = useNavigate();
    let changeHandler = e => {
		setForm({...form, [e.target.name]:e.target.value});
        console.log(form)
	}

    let submitHandler = e => {
		e.preventDefault()
        console.log(form)
        axios
			.post('http://127.0.0.1:8000/api/counter/menu/create/', form)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
				throw error;
			});	
            navigate(`/${place.id}/${place.name}/menus`, {state:{from:place}});   
            window.location.reload();	
	}
    function ToGo(){
        setAdd_menu_active(false)
    }

    return(
        <div>
            <form onSubmit={submitHandler} className='add_menu_form'>
				<div className='add_menu_popup_input regular_text_small'>
					<div className='add_menu_popup_input_label'>
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
                <div className='add_menu_popup_input'>
                    <div className='add_menu_popup_input_label regular_text_small'>
                        Current:
                    </div> 
                        <input
                            className='is_current'
                            type="checkbox"
                            name="is_current_menu"
                            value={form.is_current_menu}
                            checked={form.is_cuis_current_menu}
                            onChange={() => setForm(prev=> ({...prev, is_current_menu: !prev.is_current_menu}))}
                        />
                </div>
                <div type="submit" className='add_menu_popup_add_btn' onClick={ToGo}>
                    <RegularButton lable={'Add'}/>
                </div>
            </form>
          </div>
    )
}