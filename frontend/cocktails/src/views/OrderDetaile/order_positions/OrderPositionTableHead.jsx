import React from "react";
import '../../../styles/order_position_table_head.scss'
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context";
import { useManeContext } from "../../../components/main_context";

export function OrderPositionTableHead(){
    let orderDetaileContext = useOrderItemListContext()
    let mainContext =useManeContext()
    let order = orderDetaileContext.getOrderContext
    let user = mainContext.getUserFromMainContext()

    function renderRemoeColumn(){
        if(order){
            if(order.open_to_customer || user.role=='counter'){
                return(
                    <div className="order_position_table_head_slot remove"></div>
                )
            }
        }else{
            return(
                <div className="order_position_table_head_slot remove"></div>
            )
        }
    }
    return(
        <div className="order_position_table_head_wrapper">
            <div className="order_position_table_head_slot name">Name</div>
            <div className="order_position_table_head_slot volome">Vol.</div>
            <div className="order_position_table_head_slot qnt">Qnt</div>
            <div className="order_position_table_head_slot total">Total</div>
            {renderRemoeColumn()}
        </div>
    )
}