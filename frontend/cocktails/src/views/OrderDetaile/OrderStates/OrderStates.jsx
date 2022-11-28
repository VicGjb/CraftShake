import React from "react"
import { useState } from "react"
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context"
import { UploadOrderPhotoPopup } from "./UploadOrderPhoto"
import { RegularButton } from "../../../components/buttons/regular_button"
import { NetworkManager } from "../../../components/network_manager"

export function OrderStats(){
    let orderItemContext = useOrderItemListContext()
    let [upload_photo_active, setUploadPhotoActive] = useState(false);
    let network_manager = new NetworkManager()
    let order = orderItemContext.getOrderContext
    
    function setStateApproved(){
        network_manager.set_order_approved(order.id)
        .then(order=>{
            orderItemContext.setOrderContext(order)
        })
    }
    function setStatePaid(){
        network_manager.set_order_paid(order.id)
        .then(order=>{
            orderItemContext.setOrderContext(order)
        })
    }

    function renderStateButton(){
        if (order){
            console.log('order_state',upload_photo_active)
            switch (order.state){
                case 'Created':
                    return(
                        <div onClick={setStateApproved} className='appruve_btn'>
                            <RegularButton className='appruve_btn' lable={'Approve'} backround={'green'}/>
                        </div>
                    )
                case 'Approved':
                    return(
                        <div>
                            <div onClick={()=>{setUploadPhotoActive(true)}}>
                                <RegularButton lable={'set Delivered'} backround={'yellow'}/>
                            </div>
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
            {renderStateButton(order)}
        </div>
    )


}

