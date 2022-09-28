import React from "react";
import axios from "axios";
import { useState } from "react";

export function InvoiceListState({invoice}){
    let defaultForm = {
        state:invoice.state,
        is_vat:invoice.is_vat,
    }
    let [form, setForm] = useState(defaultForm);

    function changeHendler(e){
        setForm({...form, [e.target.name]:e.target.value})
        console.log('Form',form)
        axios
            .post(`http://127.0.0.1:8000/api/counter/invoice/update/${invoice.id}/`,{'state':e.target.value, 'is_vat':invoice.is_vat})
            .then(response => {
				console.log('UPDATE INVOICE',response);
            })
            .catch(error => {
				console.log(error);
				throw error;
			});
    }

    function stateOptions(){
        if(invoice.state=='No state'){
            return(
                <select  
                    className="invoice_detaile_content_body_status_select regular_text_small"
                    value={form.state}
                    onChange={changeHendler}
                    name='state'
                    >          
                    <option>No state</option>
                    <option>Invoiced</option>
                    <option>Paid</option>
                </select>    
                )
            }else{
                return(
                    <select  
                        className="invoice_detaile_content_body_status_select regular_text_small"
                        value={form.state}
                        onChange={changeHendler}
                        name='state'
                        >          
                        <option>Invoiced</option>
                        <option>Paid</option>
                    </select> 
                )
            }
        }

    return(
        <div>
            {stateOptions()}
        </div>
    )
}