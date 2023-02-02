import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegularButton } from "../../components/buttons/regular_button";
import { NetworkManager } from "../../components/network_manager";
import { PopupDelete } from "../../components/popup/popup_delete";
import { PopupRegularMessage } from "../../components/popup/popup_regular_message";
import { useInvoiceDetaileContext } from "./InvoiceDetileContext";
import { InvoiceStates } from "./InvoiceStates/InvoiceStates";
import '../../styles/invoice_detaile_button_rows.scss'


export function InvoiceDetileButtonRow(){
    let {placeName} = useParams();
    let {placeId} = useParams();
    let invoiceDetaileContext = useInvoiceDetaileContext()
    let invoice = invoiceDetaileContext.getInvoice

    if (invoice.state=='Created'){
        return(
            <div className="invoice_detaile_batton_row">
                <div className="invoice_detaile_button_back">
                    <Link to={`/${placeName}/${placeId}/invoices`}>
                        <RegularButton lable={'Back'}/>
                    </Link>
                </div>
                <DeleteInvoiceButton/>
                <InvoiceStates/>
            </div>
        )
    }else{
        return(
            <div className="invoice_detaile_batton_row">
                <div className="invoice_detaile_button_back">
                    <Link to={`/${placeName}/${placeId}/invoices`}>
                        <RegularButton lable={'Back'}/>
                    </Link>
                </div>
                <InvoiceStates/>
            </div>
        )
    }
}

export function DeleteInvoiceButton(){
    let invoiceDetaileContext = useInvoiceDetaileContext()
    let {placeName} = useParams();
    let {placeId} = useParams();
    let navigate = useNavigate()
    let networkManager = new NetworkManager();
    let invoice = invoiceDetaileContext.getInvoice;
    let [regular_message_active, setRegular_message_active] = useState(false)
    let [delete_active,setDelete_active] = useState(false)

    function DeleteInvoice(){
        //console.log('Order ID', invoice.id)
        if(invoice.state=='Created'){
            networkManager.delete_invoice(invoice.id)
                .then(response =>{
                    //console.log('invoice was deleted', response);
                    navigate(`/${placeName}/${placeId}/invoices`,{replace:false})
                })
                .catch(error=>{
                    //console.log(error);
                    throw error;
                });
                
        }else{
            setRegular_message_active(true)
            setDelete_active(false)
        }
    }

    return(
        <div className="delete_invoice_button_wrapper">
            <div className="delete_invoice_button" onClick={()=>{setDelete_active(true)}}>
                <RegularButton lable={'Delete'}/>
            </div>
            <PopupDelete subject={`invoice #${invoice.id} on ${invoice.date}`} delete_active={delete_active} setDelete_active={setDelete_active} func={DeleteInvoice}/>
            <PopupRegularMessage message={"You can't delete this invoice"} regular_message_active={regular_message_active}  setRegular_message_active={setRegular_message_active}/>
        </div>
    )
}


export function UpdateInvoiceButton(){
    let invoiceDetaileContext = useInvoiceDetaileContext()
    let invoice = invoiceDetaileContext.getInvoice
    let form = invoiceDetaileContext.getForm
    let navigate = useNavigate();
    let {placeName} = useParams();
    let {placeId} = useParams();
    let networkManager = new NetworkManager();

    function updateInvoice(){
        networkManager.update_invoice(invoice.id, form)
            .then(response => {
				//console.log('UPDATE INVOICE',response);
            })
            .catch(error => {
				//console.log(error);
				throw error;
			});
        navigate(`/${placeName}/${placeId}/invoices`, {replace:false})
    }

    return(
        <div className="update_invoice_button" onClick={updateInvoice}>
            <RegularButton lable={'Update'}/>
        </div>
    )
    

}