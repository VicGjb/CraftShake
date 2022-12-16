import React from "react";
import { InvoiceListState } from "./invoice_list_state";
import '../../styles/invoice_card.scss'
export function InvoiceCard({invoice}){

    function renderOrderStateColor(){
        switch(invoice.state){
            case 'Created':
                return 'regular'
            case 'Invoiced':
                return 'red '
            case 'Paid':
                return 'green'
        }
    }

    return(
        <div className="invoice_card_wrapper">
            <div className="invoise_card_slot id"># {invoice.id}</div>
            <div className="invoise_card_slot date">{invoice.date.split('-').reverse().join('.')}</div>
            <div className="invoise_card_slot amount">{invoice.amount}</div>
            <div className="invoise_card_slot total">{invoice.total_amount}</div>
            <div className={`invoise_card_slot state ${renderOrderStateColor()}`}>{invoice.state}</div>
        </div>
    )
}