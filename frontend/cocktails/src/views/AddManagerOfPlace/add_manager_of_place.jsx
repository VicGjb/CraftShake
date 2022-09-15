import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { RegularButton } from '../../components/buttons/regular_button';

export function AddManagerOfPlace({place, setAdd_manager_active}) {
	let defaultForm = {
        name:'',
        phone:'',
        description:'',
        place:place.id,
    }
    let [form, setForm] =  useState(defaultForm);

    let changeHandler = e => {
		setForm({...form, [e.target.name]:e.target.value});
        console.log(form)
	}
    let submitHandler = e => {
		e.preventDefault()
        axios
			.post('http://127.0.0.1:8000/api/counter/manager/create/', form)
			.then(response => {
				console.log(response);
                console.log(form)
			})
			.catch(error => {
				console.log(error);
				throw error;
			});		
            window.location.reload();
	}
      return(
          <div>
            <form className='add_manager_form' onSubmit={submitHandler}>
                <div className='add_manager_input_wrapper'>
                    <div className='add_manager_input_labele regular_text_small'>
                        Name:
                    </div>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={changeHandler}
                    />
                </div>
               
                <div className='add_manager_input_wrapper'>
                    <div className="add_manager_input_labele regular_text_small">
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
                <div className='add_manager_input_wrapper'>
                    <div className="add_manager_input_labele regular_text_small">
                        Discription:
                    </div>
                    <textarea
                        className='discription_input'
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={changeHandler}
                    />
                </div>
                <div className='submit_button' type="submit">
                    <RegularButton lable={'Add'}/>
                </div>
            </form>

          </div>
      )
}