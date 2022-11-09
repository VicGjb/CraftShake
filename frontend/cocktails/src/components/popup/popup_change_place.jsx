import React from "react";
import { useState } from "react";
import { NetworkManager } from "../network_manager";
import { RegularButton } from "../buttons/regular_button";


export function PopupChangePlace({place, add_change_place_active, setAdd_Change_place_active}){

    let defaultForm = {
        name: place.name,
        address:place.address,
        phone:place.phone,
        email:place.email,
        is_current_place:place.is_current_place,
    }
    let network_manager = new NetworkManager();
	let [form, setForm] =  useState(defaultForm);
    let changeHandler = e => {
		setForm({...form, [e.target.name]:e.target.value})
        // console.log(form)
	}
    let submitHandler = e => {
		e.preventDefault()
        network_manager.change_place(place.id, form)
        .then(response => {
            // console.log(response);
            setForm(defaultForm);
        })
        .catch(error => {
            console.log(error);
            throw error;
        });		
        window.location.reload()
	}

    return(
        <div className={add_change_place_active ? 'popup_wrapper active' : 'popup_wrapper'} onClick={()=>setAdd_Change_place_active(false)}>
            <div className="popup_add_product_content" onClick={e => e.stopPropagation()}>
                <div className="popup_title">
                    Change {place.name}
                </div>
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
                    <RegularButton lable={'Change'}/>
                </div>
			</form>
		</div>
            </div>
        </div>
    )
}