import React from "react"
import { useState } from "react"
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context"
import { UploadOrderPhotoPopup } from "./UploadOrderPhoto"
import { RegularButton } from "../../../components/buttons/regular_button"
import { NetworkManager } from "../../../components/network_manager"
import {ReactComponent as CameraIcon} from "../../../svg/camera_icon.svg"
import '../../../styles/order_states.scss'

export function OrderStates(){
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
            switch (order.state){
                case 'Created':
                    return(
                        <div onClick={setStateApproved} className='appruve_btn'>
                            <RegularButton lable={'Approve'}/>
                        </div>
                    )
                case 'Approved':
                    return(
                        <div>
                            <div className='delivered_btn' onClick={()=>{setUploadPhotoActive(true)}}>
                                <RegularButton lable={'set Delivered'}/>
                            </div>
                            <UploadOrderPhotoPopup upload_photo_active={upload_photo_active} setUploadPhotoActive={setUploadPhotoActive} />
                        </div>
                    )
                case 'Delivered':
                    return(
                        <div className="state_conteiner">
                            <div className='paid_btn' onClick={setStatePaid}>
                                <RegularButton lable={'Set Paid'}/>
                            </div>    
                        </div>  
                    )
                case 'Paid':
                    return(
                        <div className="paid_state">
                            Paid
                        </div>
                    )
            }
        }
    }

    return(
            renderStateButton(order)
    )


}

