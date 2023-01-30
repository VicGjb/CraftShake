import React from "react";
import '../../styles/order_list_table_head.scss'

export function OrderListTableHead(){

    return(
        <div className="order_list_table_head_wrapper">
            <div className="order_list_table_head_slot id">
                ID
            </div>
            <div className="order_list_table_head_slot date">
                Date
            </div>
            <div className="order_list_table_head_slot state">
                Status
            </div>
            <div className="order_list_table_head_slot total_price">
                Total
            </div>
        </div>
    )
}