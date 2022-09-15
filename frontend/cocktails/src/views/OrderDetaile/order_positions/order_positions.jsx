import React, { useEffect, useState } from "react";
import { OrderPositionRow } from "./order_position_row";
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context";

export function OrderPositions(props){
    let order_positions = useOrderItemListContext()
    // let [current_order_item_list, setCurrentOrderItemList]=useState(order_positions.list)
 
    // useEffect(()=>{
    //     console.log('main use effect',order_positions.list)
    //     // order_positions.current_order_item(current_order_item_list)
    // },[order_positions.change_flag])

    useEffect(()=>{
        console.log('useEffect in OrderPositions')
        order_positions.current_order_item(props.order.order_item)
        CreateUniqId()
    },[props.order.order_item])
    

    function ChangeHendler(){
        console.log('position Cgange')
        // setCurrentOrderItemList(order_positions.list)
        order_positions.update_order_positions()
    }

    function calculateTotal(){
        let result = 0
        order_positions.list.map(order_item =>(
            result = Number(result) + Number(order_item.item_price)
        ))
        return (result.toFixed(2))
    }

    function CreateUniqId(){
        console.log('im here')
        let tempid=1
        order_positions.list.map(order_item =>{
            order_item.temp_id = tempid
            tempid=tempid + 1
        }   
        )
    }

    return(
        <div className="order_positions_table_wrapper">
            <div className="order_positions_table">
                {order_positions.list.map(order_item=>(
                    <div key={order_item.temp_id}>
                        <OrderPositionRow order_item={order_item} onChange={ChangeHendler} key={order_item.temp_id}/>
                        {/* <div className="regular_text">{order_item.temp_id}ffw {order_item.name}</div> */}
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