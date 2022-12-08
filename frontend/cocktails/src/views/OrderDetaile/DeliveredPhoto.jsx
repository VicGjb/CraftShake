import React from "react";
import { useOrderItemListContext } from "./OrderDetaileContext/order_item_list_context";


export function DeliveredPhotoPopup({deliveredPhotoActive, setDeliveredPhotoActiv}){
    let orderItemContext = useOrderItemListContext()
    let order = orderItemContext.getOrderContext

    return(
        <div className={deliveredPhotoActive  ? 'popup_wrapper active' : 'popup_wrapper'} onClick={()=>setDeliveredPhotoActiv(false)}>
            <div className="popup_add_product_content" onClick={e => e.stopPropagation()}>
                {/* <div className="popup_title">
                    Photo
                </div> */}
                <div>
                    <img src={order.photo} width='600' height='600' />
                </div>
            </div>
        </div>  

    )
}