import React,{useContext} from "react";
import { ReactComponent as CrossDel } from "../../../svg/cross_del.svg";
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context";

export function OrderPositionRow(props){
    let order_positions = useOrderItemListContext()
    let order_item = props.order_item
    let onChange = props.onChange
    
    function DeleteItem(){
        order_positions.remove(order_item)
        ChangeHendler()
    }

    function ChangeHendler(){
        onChange(order_positions.list);
    }

    return(
        <div className="order_positions_table_row regular_text_small" key={order_item.id}>
            <div className="order_positions_table_row_slot name">
                {order_item.name}
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