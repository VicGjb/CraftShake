import React, { Component, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NetworkManager } from '../../components/network_manager';
import { RegularButton } from '../../components/buttons/regular_button';

export function AddMenu({ setAdd_menu_active}) {
	let {placeId} = useParams();
    let {placeName} = useParams();
    let network_manager = new NetworkManager()
    let defaultForm = {
        name:'',
        is_current_menu:false,
        place: placeId,
    };

    let [form, setForm] =  useState(defaultForm);
    let navigate = useNavigate();
    let changeHandler = e => {
		setForm({...form, [e.target.name]:e.target.value});
        console.log(form)
	}

    let submitHandler = e => {
		e.preventDefault()
        console.log(form)
        network_manager.create_menu(form)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
				throw error;
			});	
            navigate(`/${placeName}/${placeId}/menus`);   
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