import React from "react";
import { useOrderItemListContext } from "./OrderDetaileContext/order_item_list_context";


export function DeliveredPhotoPopup({deliveredPhotoActive, setDeliveredPhotoActiv}){
    let orderItemContext = useOrderItemListContext()
    let order = orderItemContext.getOrderContext

    return(
        <div className={deliveredPhotoActive  ? 'popup_mobile_wrapper active' : 'popup_wrapper'} onClick={()=>setDeliveredPhotoActiv(false)}>
            <div className="popup_add_product_content" onClick={e => e.stopPropagation()}>
                    <img src={order.photo} width='100%' height='100%' />
            </div>
        </div>  

    )
}