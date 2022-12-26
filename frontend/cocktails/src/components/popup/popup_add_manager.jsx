import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { RegularButton } from "../buttons/regular_button";
import { NetworkManager } from "../network_manager";
import { useManagersContext } from "../../views/ManagersList/ManagersContext";
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"
import '../../styles/popup_add_manager.scss'

export function PopupAddManager({add_manager_active, setAdd_manager_active, manager}){
    let {placeName} = useParams();
    let {placeId} = useParams();
    let networkManager = new NetworkManager()
    let managersContext = useManagersContext()
	let defaultForm = setDefaultForm()
    let [form, setForm] =  useState(defaultForm);

    function setDefaultForm(){
        if(manager){
            return(
                {
                name: manager.name,
                phone: manager.phone,
                description: manager.description,
                place: placeId,
            })
        }else{
            return({
                    name:'',
                    phone:'',
                    description:'',
                    place:placeId,
                })
        }
    }
    let changeHandler = e => {
		setForm({...form, [e.target.name]:e.target.value});
        console.log(form)
	}
    let submitHandler = e => {
		e.preventDefault()
        if(manager){
            networkManager.update_manager(manager.id,form)
            .then(response => {
                managersContext.setManagersList(response);
            })
            .catch(error => {
                console.log(error);
                throw error;
            })
            setAdd_manager_active(false)
        }else{
            networkManager.create_manager(form)
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
        
        }

    return(
        <div className={add_manager_active ? 'popup_mobile_wrapper active' : 'popup_wrapper'} onClick={()=>setAdd_manager_active(false)}>
            <div className="popup_mobile_content add_manager" onClick={e => e.stopPropagation()}>
                <div className="popup_filter_sevice_button_wrapper">
                    <div className="popup_filter_close_button" onClick={()=>{setAdd_manager_active(false)}}>
                        <CloseIcon className='close_button_icon'/>
                    </div> 
                </div>
                
                
                <div className="popup_title add_manager">
                    {manager ? `Update manager  ${manager.name}`:`Add manager for ${placeName}`}
                </div>
                <form className='add_manager_form' onSubmit={submitHandler}>
                    <div className='add_manager_input_wrapper'>
                        <div className='add_manager_input_labele'>
                            Name:
                        </div>
                        <input
                            className="name"
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={changeHandler}
                        />
                    </div>
                
                    <div className='add_manager_input_wrapper'>
                        <div className="add_manager_input_labele">
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
                        <div className="add_manager_input_labele">
                            Description:
                        </div>
                        <textarea
                            className='description_input'
                            type="text"
                            name="description"
                            value={form.description}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='submit_button add_manager' type="submit">
                        <RegularButton lable={manager?'Update':'Add'}/>
                    </div>
                </form>       
            </div>
        </div>
    )
}