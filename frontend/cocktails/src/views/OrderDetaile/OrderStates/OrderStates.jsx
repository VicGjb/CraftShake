import React from "react"
import { useState } from "react"
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context"
import { UploadOrderPhotoPopup } from "./UploadOrderPhoto"
import { RegularButton } from "../../../components/buttons/regular_button"
import { NetworkManager } from "../../../components/network_manager"

export function OrderStats({order, setOrder}){
    let orderItemContext = useOrderItemListContext()
    let orderId = orderItemContext.getOrderIdContext
    let [upload_photo_active, setUploadPhotoActive] = useState(false);
    let network_manager = new NetworkManager()
    
    function setStateApproved(){
        network_manager.set_order_approved(orderId)
        .then(order=>{
            setOrder(order)
        })
    }
    function setStatePaid(){
        network_manager.set_order_paid(orderId)
        .then(order=>{
            setOrder(order)
        })
    }

    function renderStateButton(orederId){
        if (orderId){
            console.log('order_state',order.state)
            switch (order.state){
                case 'Created':
                    return(
                        <div onClick={setStateApproved}>
                            <RegularButton lable={'Approve'}/>
                        </div>
                    )
                case 'Approved':
                    return(
                        <div onClick={()=>{setUploadPhotoActive(true)}}>
                            <RegularButton lable={'set Delivered'}/>
                            <UploadOrderPhotoPopup upload_photo_active={upload_photo_active} setUploadPhotoActive={setUploadPhotoActive} />
                        </div>
                    )
                case 'Delivered':
                    return(
                        <div onClick={setStatePaid}>
                            <RegularButton lable={'Set Paid'}/>
                        </div>
                    )
                case 'Paid':
                    return(
                        <div className="regular_text">
                            Paid
                        </div>
                    )
            }
        }
    }

    return(
        <div>
            {renderStateButton(orderId)}
        </div>
    )


}

