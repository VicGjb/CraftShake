import React, { Component, useEffect, useState } from 'react';
import { NetworkManager } from '../../components/network_manager';
import { RegularButton } from '../../components/buttons/regular_button';
import { useParams } from 'react-router-dom';
import { useManagersContext } from '../ManagersList/ManagersContext';

export function AddManagerOfPlace({place, setAdd_manager_active}) {
    let {placeId} = useParams();
    let {placeName} = useParams();
    let network_manager = new NetworkManager()
    let managersContext = useManagersContext()
	let defaultForm = {
        name:'',
        phone:'',
        description:'',
        place:placeId,
    }
    let [form, setForm] =  useState(defaultForm);

    let changeHandler = e => {
		setForm({...form, [e.target.name]:e.target.value});
        console.log(form)
	}
    let submitHandler = e => {
		e.preventDefault()
        network_manager.create_manager(form)
			.then(response => {
                managersContext.setManagersList(response)
				console.log(response);
			})
			.catch(error => {
				console.log(error);
				throw error;
			});		
            setAdd_manager_active(false)
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