import React from "react";
import '../../../styles/order_position_table_head.scss'

export function OrderPositionTableHead(){
    return(
        <div className="order_position_table_head_wrapper">
            <div className="order_position_table_head_slot name">Name</div>
            <div className="order_position_table_head_slot volome">Vol.</div>
            <div className="order_position_table_head_slot qnt">Qnt</div>
            <div className="order_position_table_head_slot total">Total</div>
            <div className="order_position_table_head_slot remove"></div>
        </div>
    )
}