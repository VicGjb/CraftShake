import React from "react";
import { ReactComponent as CrossDel } from "../../../svg/cross_del.svg";
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context";
import { useMainContext } from "../../../router/main_context";
import '../../../styles/order_position_card.scss'

export function OrderPositionCard({order_item}){
    let main_context = useMainContext()
    let user = main_context.getUserFromMainContext()
    let order_detile_context = useOrderItemListContext()
    let volume = main_context.getVolomeNameFromMainContext(order_item.volume)
    let order = order_detile_context.getOrderContext

    function DeleteItem(){
        order_detile_context.removeItem(order_item)
    }
    function renderRemoveButton(){
        if (order){
            if(order.open_to_customer || user.role ==='counter'){
                return(
                    <div className="order_position_card_slot remove"> <button className="cross_del_btn" onClick={DeleteItem} ><CrossDel className='icon_cross_del_btn'/></button></div>
                )
            }
        }else{
            return(
                <div className="order_position_card_slot remove"> <button className="cross_del_btn" onClick={DeleteItem} ><CrossDel className='icon_cross_del_btn'/></button></div>
            )
        }

    }
    return(
        <div className="order_position_card_wrapper">
            <div className="order_position_card_slot name">{order_item.name}</div>
            <div className="order_position_card_slot volome">{volume}</div>
            <div className="order_position_card_slot qnt">x{order_item.quantity}</div>
            <div className="order_position_card_slot total">{Number(order_item.item_price).toFixed(2)} ₪</div>
            {renderRemoveButton()}
        </div>
    )
}