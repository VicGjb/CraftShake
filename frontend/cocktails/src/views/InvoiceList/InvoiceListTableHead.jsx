import React from "react";
import '../../styles/invoice_list_table_head.scss'

export function InvoiceListTableHead(){
    

    return(
        <div className="invoice_list_table_head_wrapper">
            <div className="invoice_list_table_head_slot id">
                ID
            </div>
            <div className="invoice_list_table_head_slot date">
                Date
            </div>
            <div className="invoice_list_table_head_slot amount">
                Amount
            </div>
            <div className="invoice_list_table_head_slot total_amount">
                Total
            </div>
            <div className="invoice_list_table_head_slot state">
                State
            </div>
        </div>

    )
}