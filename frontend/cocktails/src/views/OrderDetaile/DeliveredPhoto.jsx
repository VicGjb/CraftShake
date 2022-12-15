import React from "react";
import { useOrderItemListContext } from "./OrderDetaileContext/order_item_list_context";
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"
import '../../styles/delivered_photo_popup.scss'
export function DeliveredPhotoPopup({deliveredPhotoActive, setDeliveredPhotoActiv}){
    let orderItemContext = useOrderItemListContext()
    let order = orderItemContext.getOrderContext

    return(
        <div className={deliveredPhotoActive  ? 'popup_mobile_wrapper active' : 'popup_wrapper'} onClick={()=>setDeliveredPhotoActiv(false)}>
            <div className="popup_delivered_photo_content" onClick={e => e.stopPropagation()}>
                <div className="popup_delivered_photo_sevice_button_wrapper">
                    <div className="popup_delivered_photo_close_button" onClick={()=>{setDeliveredPhotoActiv(false)}}>
                        <CloseIcon className='close_button_icon'/>
                    </div>  
                </div> 
                <div className="popup_delivered_photo_wrapper">
                    <img src={order.photo} width='100%' height='100%' />
                </div>   
            </div>
        </div>  

    )
}