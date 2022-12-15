import React from "react";
import { NetworkManager } from "../network_manager";
import { useState } from "react";
import { RegularButton } from "../buttons/regular_button";
import { useNavigate, useParams } from "react-router-dom";
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"
import '../../styles/popup_add_invoice.scss'

export function PopupAddInvoice({add_invoice_active, setAdd_invoice_active}){
    let {placeId} = useParams();
    let {placeName} = useParams();
    let defaultForm = {
        place: placeId,
        date:'',
        from_date:'',
        until_date:'',
        is_vat:false,
    }
    let network_manager = new NetworkManager()
    let [form, setForm] = useState(defaultForm);
    let [orders, setOrders] = useState([]);
    let navigate = useNavigate();

    function submitHandler(e){
        e.preventDefault()
        console.log('submit_form',form)
        network_manager.create_invoice(form)
            .then(response=>{
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                throw error;
            });
            navigate(`/${placeName}/${placeId}/invoices`,)
            window.location.reload();

    }
    function changeHandler(e){
        setForm({...form, [e.target.name]:e.target.value})
        console.log('Change')
        console.log('submit',form)
        // network_manager.change_invoice(placeId, form.from_date, form.until_date)
        //     .then(response =>{
        //         setOrders(response.data.results)
        //         console.log(response.data.results)
        //     })
    }


    function changeHandlerVat(e){
        setForm({...form, [e.target.name]:e.target.checked})
    }

    function ToGo(){
        setAdd_invoice_active(false)    
    }

    return(
        <div className={add_invoice_active ? 'popup_mobile_wrapper active' : 'popup_mobile_wrapper'} onClick={()=>{setAdd_invoice_active(false)}}>
            <div className="popup_mobile_content_create_invoice" onClick={e => e.stopPropagation()}>  
                <div className="popup_filter_sevice_button_wrapper">
                    <div className="popup_filter_close_button" onClick={()=>{setAdd_invoice_active(false)}}>
                        <CloseIcon className='close_button_icon'/>
                    </div> 
                </div>
                <div className="add_invoice_title">
                    Create invoice for {placeName}
                </div>

                <form  className="add_invoice_form" onSubmit={submitHandler}>
                    <div className="add_invoice_form_date from">
                        <div className="add_invoice_form_date_lable">
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
                    <div className="add_invoice_form_date from">
                        <div className="add_invoice_form_date_lable">
                            From
                        </div>
                        <div>
                            <input 
                                className="date_input"
                                type='date'
                                name='from_date'
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                    <div className="add_invoice_form_date to">
                        <div className="add_invoice_form_date_lable">
                            Until
                        </div>
                        <div>
                            <input 
                                className="date_input"
                                type='date'
                                name='until_date'
                                onChange={changeHandler}
                            />
                        </div>
                    </div>

                    <div className="add_invoice_form_date to">
                        <div className="add_invoice_form_date_lable">
                            Add VAT:
                        </div>
                        <div>
                            <input 
                                className="checkbox_input"
                                type='checkbox'
                                name='is_vat'
                                onChange={changeHandlerVat}
                            />
                        </div>
                    </div>

                    <div type="submit" onClick={ToGo} className='add_invoice_form_submit_btn'>
                        <RegularButton lable={"Create"}/>
                    </div>
                </form>
                <div className="popup_footer">
                </div>
            </div>
        </div>
    )
}