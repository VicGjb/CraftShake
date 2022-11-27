import React, { useEffect, useState } from "react";
import { OrderPositionRow } from "./order_position_row";
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context";

export function OrderPositions(){   

    let order_detaile_context = useOrderItemListContext()

    function ChangeHendler(){
        console.log('position Change')
    }

    function calculateTotal(){
        let result = 0
        order_detaile_context.item_list.map(order_item =>(
            result = Number(result) + Number(order_item.item_price)
        ))
        return (result.toFixed(2))
    }


    return(
        <div className="order_positions_table_wrapper">
            <div className="order_positions_table">
                {order_detaile_context.item_list.map(order_item=>(
                    <div key={order_item.uuid}>
                        <OrderPositionRow 
                        order_item={order_item} 
                        onChange={ChangeHendler} 
                        />
                    </div>
                ))}
            </div>
            <div className="order_total_info regular_text_small">
                <div className="order_detaile_total">  
                    Total: {calculateTotal()} ILS
                </div>
            </div>                        
        </div>
        )
}