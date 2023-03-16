import React, { useEffect } from "react";
import { ReactComponent as CrossDel } from "../../../svg/cross_del.svg";
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context";
import { useMainContext } from "../../../router/main_context";

export function OrderPositionRow({
    order_item, 
    onChange,
}){
    let main_context = useMainContext()
    let order_detile_context = useOrderItemListContext()
    let volume = main_context.getVolomeNameFromMainContext(order_item.volume)

    
    function DeleteItem(){
        order_detile_context.removeItem(order_item)
        ChangeHendler()
    }

    function ChangeHendler(){
        onChange(order_detile_context.item_list);
    }

    return(
        <div className="order_positions_table_row regular_text_small" key={order_item.id}>
            <div className="order_positions_table_row_slot name">
                {order_item.name} {volume}
            </div>
            <div className="order_positions_table_row_slot qnt">
                x{order_item.quantity}
            </div>
            <div className="order_positions_table_row_slot price">
                {Number(order_item.item_price).toFixed(2)}
            </div>
            <div className="order_positions_table_row_slot delete">
                <button className="cross_del_btn" onClick={DeleteItem} ><CrossDel className='icon_cross_del_btn'/></button>
            </div>
        </div>
    )
} 