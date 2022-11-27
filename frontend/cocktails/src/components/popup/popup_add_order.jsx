import React, { useState} from "react";
import axios from "axios";
import { NetworkManager } from "../network_manager";
import { RegularButton } from "../buttons/regular_button";
import {useNavigate, useParams,} from "react-router-dom";

export const PopupAddOrder =({add_order_active, setAdd_order_active})=>{
    let {placeId} = useParams();
    let {placeName} = useParams();
    let defaultForm = {
        order:{
            date: '',
            place: {placeId},
        },
        order_item_list: [],
    }
    let [form, setForm] = useState(defaultForm);
    let network_manager = new NetworkManager()
    let navigate = useNavigate();

    let changeHandler = e =>{
        setForm({...form, ['order']:{['date']:e.target.value, ['place']:placeId}})
        console.log('ayyyy', form)
    }

    let submitHandler = e =>{
        e.preventDefault()
        console.log('FOrm',form)
        network_manager.create_order(form)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
				throw error;
			});
        navigate(`/${placeName}/${placeId}/orders`,);   
        window.location.reload();
	}

    function ToGo(){
        setAdd_order_active(false)
    }

    return(
        <div className={add_order_active ? 'popup_wrapper active' : 'popup_wrapper'} onClick={()=>setAdd_order_active(false)}>
            <div className="popup_content" onClick={e => e.stopPropagation()}>
                <div className="popup_title">
                    Add order for <br/>{placeName}
                </div>
                <form onSubmit={submitHandler} className='add_order_form'>
                    <div className="add_order_popup_date">
                        <div className="date_lable">
                            Date
                        </div>
                        <div>
                            <input
                                className="date_input"
                                type='date'
                                name='date'
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                    <div type="submit"  onClick={ToGo}>
                        <RegularButton lable={'Add'}></RegularButton>
                    </div>               
                </form>           
            </div>
        </div>
    )
}