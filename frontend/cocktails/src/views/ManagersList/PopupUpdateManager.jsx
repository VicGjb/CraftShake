import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { NetworkManager } from "../../components/network_manager";
import { useManagersContext } from "./ManagersContext";
import { RegularButton } from "../../components/buttons/regular_button";
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"

export function PopupUpdateManager({manager, updateManagerActive, setUpdateManagerActive}){
    let {placeId} = useParams()
    let {placeName} = useParams()
    let defaultForm = {
        name: manager.name,
        phone: manager.phone,
        description: manager.description,
        place: placeId,
    };
    let [form, setForm] = useState(defaultForm);
    let networkManager = new NetworkManager();
    let managersContext = useManagersContext();

    function changeHandler(e){
        setForm({...form, [e.target.name]:e.target.value});
        //console.log(form)
    }

    function submitHandler(e){
        e.preventDefault()
        networkManager.update_manager(manager.id,form)
            .then(response => {
                managersContext.setManagersList(response);
            })
            .catch(error => {
                //console.log(error);
                throw error;
            })
        setUpdateManagerActive(false)
        }


    return(
        <div className={updateManagerActive ? 'popup_mobile_wrapper active' : 'popup_wrapper'} onClick={()=>setUpdateManagerActive(false)}>
            <div className="popup_mobile_content add_manager" onClick={e => e.stopPropagation()}>
                <div className="popup_filter_sevice_button_wrapper">
                    <div className="popup_filter_close_button" onClick={()=>{setUpdateManagerActive(false)}}>
                        <CloseIcon className='close_button_icon'/>
                    </div> 
                </div>
                
                
                <div className="popup_title add_manager">
                    Add manager for <br/>{placeName}
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
                        <RegularButton lable={'Add'}/>
                    </div>
                </form>       
            </div>
        </div>
    )
}