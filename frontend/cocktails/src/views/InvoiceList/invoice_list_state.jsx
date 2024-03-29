import React from "react";
import { NetworkManager } from "../../api/network_manager";
import { useState } from "react";

export function InvoiceListState({invoice}){
    let defaultForm = {
        state:invoice.state,
        is_vat:invoice.is_vat,
    }
    let [form, setForm] = useState(defaultForm);
    let network_manager = new NetworkManager()


    function changeHendler(e){
        setForm({...form, [e.target.name]:e.target.value})
        //console.log('Form',form)
        network_manager.change_invoice_state(invoice.id,{'state':e.target.value, 'is_vat':invoice.is_vat} )
            .then(response => {
				//console.log('UPDATE INVOICE',response);
            })
            .catch(error => {
				//console.log(error);
				throw error;
			});
    }

    function stateOptions(){
        if(invoice.state=='No state'){
            return(
                <select  
                    className="invoice_detaile_content_body_status_select"
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