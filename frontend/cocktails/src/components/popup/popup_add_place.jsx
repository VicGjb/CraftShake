import React, { useEffect } from "react";
import { useState } from "react";
import { useManeContext } from "../main_context";
import { RegularButton } from "../buttons/regular_button";
import { NetworkManager } from '../../components/network_manager';
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"
import '../../styles/popup_add_place.scss'

export function PopupAddPlace({add_place_active, setAdd_place_active, setPlaces, newPlace}){
    let emptyForm = {
        name:'',
        address:'',
        phone:'',
        email:'',
        is_current_place:true,
    }
    let mainContext = useManeContext();
    let placeContext = mainContext.getPlace
    let defaultForm = setDefaultForm()
	let [form, setForm] =  useState(defaultForm);
    let networkManager = new NetworkManager();
    
    
    function setDefaultForm(){
        if(newPlace){
            console.log('EBANNAI PLACE',placeContext )
            return(
                    emptyForm
                )
        }else{
            return( {
                name:placeContext.name,
                address:placeContext.address,
                phone:placeContext.phone,
                email:placeContext.email,
                is_current_place:placeContext.is_current_place,
                }
            )
        }
    }
    
    let changeHandler = e => {
		setForm({...form, [e.target.name]:e.target.value})
        console.log('form',form)
	}

	let submitHandler = e => {
		e.preventDefault()


        if(placeContext){
            networkManager.change_place(placeContext.id, form)
            .then(response => {
                mainContext.setPlace(response.data)
                setForm(emptyForm)
            })
            .catch(error => {
                console.log(error);
                throw error;
            });		
            setAdd_place_active(false)

        }else{
            networkManager.create_place(form)
			.then(response => {
                setPlaces(response)
				setForm(emptyForm);
			})
			.catch(error => {
				console.log(error);
				throw error;
			});		
            setAdd_place_active(false)
        }        
	}

    return(
        <div className={add_place_active ? 'popup_mobile_wrapper active' : 'popup_mobile_wrapper'} onClick={()=>{setAdd_place_active(false)}}>
            <div className="popup_mobile_content add_place" onClick={e => e.stopPropagation()}>
                <div className="popup_filter_sevice_button_wrapper">
                    <div className="popup_filter_close_button" onClick={()=>{setAdd_place_active(false)}}>
                        <CloseIcon className='close_button_icon'/>
                    </div> 
                </div>
                
                
                <div className="popup_title add_place">
                    {placeContext? `Change place ${placeContext.name}`:'Add new place'}
                </div>

                <form onSubmit={submitHandler} className='add_place_form'>

                    <div className='add_place_input_wrapper'>
                        <div className='add_place_input_labele'>
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
                        <div className='add_place_input_labele'>
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
                        <div className='add_place_input_labele'>
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
                        <div className='add_place_input_labele'>
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
                        <div className='add_place_input_labele'>
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
                    <div className='submit_button add_place' type="submit">
                        <RegularButton lable={'Accept'}/>
                    </div>
                </form>        
            </div>
        </div>
    )
}