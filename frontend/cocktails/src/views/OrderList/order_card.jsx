import React from "react";
import '../../styles/order_card.scss'
export function OrderCard({order}){
    
    function renderOrderStateColor(){
        switch(order.state){
            case 'Created':
                return 'regular'
            case 'Approved':
                return 'yellow'
            case 'Delivered':
                return 'red '
            case 'Paid':
                return 'green'
        }
    }

    return(
        <div className="order_card_wrapper">
            <div className="order_card_slot id">
                # {order.id}
            </div>
            <div className="order_card_slot date">
                {order.date}
            </div>
            <div className={`order_card_slot state ${renderOrderStateColor()}`}>
                {order.state}
            </div>
            <div className="order_card_slot total_price">
                {order.total_price}
            </div>
        </div>
    )
}