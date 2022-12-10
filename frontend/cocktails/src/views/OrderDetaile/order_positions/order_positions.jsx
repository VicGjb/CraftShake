import React, { useEffect, useState } from "react";
import { OrderPositionRow } from "./order_position_row";
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context";
import { OrderPositionCard } from "./OrderPositionCard";
import { OrderPositionTableHead } from "./OrderPositionTableHead";
import { RegularButton } from "../../../components/buttons/regular_button";
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
            <div className="order_info">   
                <div className="add_cocktails_btn" onClick={()=>{console.log('OK')}}>
                    <RegularButton lable={'Add cocktails'}/>
                </div>
                <div className="order_detaile_total_monitor">  
                    Total: {calculateTotal()} ILS
                </div>
            </div>     
            <div className="order_positions_table">
                <OrderPositionTableHead/>
                {order_detaile_context.item_list.map(order_item=>(
                    <div className='positions_wrapper' key={order_item.uuid}>
                        <OrderPositionCard 
                            order_item={order_item} 
                        />
                    </div>
                ))}
            </div>
            <div className="total_mobile_wrapper">
                <div className="order_detaile_total_mobile">  
                    Total: {calculateTotal()} ILS
                </div>
            </div>
                
        </div>
        )
}