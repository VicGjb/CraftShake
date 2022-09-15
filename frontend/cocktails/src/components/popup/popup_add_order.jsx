import React, { useState} from "react";
import axios from "axios";
import { RegularButton } from "../buttons/regular_button";
import {useNavigate,} from "react-router-dom";

export const PopupAddOrder =({add_order_active, setAdd_order_active, place})=>{
    let defaultForm = {
        date: '',
        place: {place}
    }
    let [form, setForm] = useState(defaultForm);
    let navigate = useNavigate();


    let changeHandler = e =>{
        setForm({...form, ['date']:e.target.value, ['place']:place.id});
    }

    let submitHandler = e =>{
        e.preventDefault()
        console.log(form)
        axios
			.post('http://127.0.0.1:8000/api/counter/order/create/', form)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
				throw error;
			});
        // navigate(`/${place.id}/${place.name}/orders`, {state:{from:place}});   
        // window.location.reload();
	}

    function ToGo(){
        setAdd_order_active(false)
    }

    return(
        <div className={add_order_active ? 'popup_wrapper active' : 'popup_wrapper'} onClick={()=>setAdd_order_active(false)}>
            <div className="popup_content" onClick={e => e.stopPropagation()}>
                <div className="popup_title">
                    Add order for <br/>{place.name}
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