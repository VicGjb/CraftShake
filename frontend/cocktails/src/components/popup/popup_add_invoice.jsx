import React from "react";
import axios from "axios";
import { useState } from "react";
import { RegularButton } from "../buttons/regular_button";
import { useNavigate } from "react-router-dom";


export function PopupAddInvoice({add_invoice_active, setAdd_invoice_active, place}){

    let defaultForm = {
        place: place.id,
        date:'',
        from_date:'',
        until_date:'',
        is_vat:false,
    }
    
    let [form, setForm] = useState(defaultForm);
    let [orders, setOrders] = useState([]);
    let navigate = useNavigate();

    function submitHandler(e){
        e.preventDefault()
        console.log('submit_form',form)
        axios
            .post(`http://127.0.0.1:8000/api/counter/invoice/create/`, form)
            .then(response=>{
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                throw error;
            });
            navigate(`/${place.id}/${place.name}/invoices`, {state:{from:place}})
            window.location.reload();

    }
    function changeHandler(e){
        setForm({...form, [e.target.name]:e.target.value})
        console.log('Change')
        console.log('submit',form)
        axios
            .get(`http://127.0.0.1:8000/api/counter/order/?place=${place.id}&date_after=${form.from_date}&date_before=${form.until_date}`)
            .then(response =>{
                setOrders(response.data.results)
                console.log(response.data.results)
            })
    }


    function changeHandlerVat(e){
        setForm({...form, [e.target.name]:e.target.checked})
    }


    function ToGo(){
        setAdd_invoice_active(false)    
    }

    return(
        <div className={add_invoice_active ? 'popup_wrapper active' : 'popup_wrapper'} onClick={()=>setAdd_invoice_active(false)}>
            <div className="add_invoice" onClick={e => e.stopPropagation()}>
                <div className="add_invoice_title regular_text  ">
                    Add new invoice for {place.name}
                </div>
                <div className="add_invoice_content regular_text_small">
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
                            <RegularButton lable={"Add"}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}