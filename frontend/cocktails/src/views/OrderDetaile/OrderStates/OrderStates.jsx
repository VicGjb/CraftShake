import React from "react"
import { useState } from "react"
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context"
import { UploadOrderPhotoPopup } from "./UploadOrderPhoto"
import { RegularButton } from "../../../components/buttons/regular_button"
import { NetworkManager } from "../../../components/network_manager"
import '../../../styles/order_states.scss'
import { useManeContext } from "../../../components/main_context"

export function OrderStates(){
    let orderItemContext = useOrderItemListContext()
    let [upload_photo_active, setUploadPhotoActive] = useState(false);
    let network_manager = new NetworkManager()
    let order = orderItemContext.getOrderContext
    let mainContext = useManeContext()
    let user = mainContext.getUserFromMainContext()
    
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
                            <div className='delivered_btn' onClick={()=>{orderItemContext.setUploadPhotoActive(true)}}>
                                <RegularButton lable={'set Delivered'}/>
                            </div>
                        </div>
                    )
                case 'Delivered':
                    return(
                        <div className='paid_btn' onClick={setStatePaid}>
                            <RegularButton lable={'Set Paid'}/>
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

    function renderStateLabel(){
        if (order){
            switch (order.state){
                case 'Created':
                    return(
                        <div className='created_state_label'>
                           Created
                        </div>
                    )
                case 'Approved':
                    return(
                        <div className='approved_state_label'>
                            Approved
                        </div>
                    )
                case 'Delivered':
                    return(
                        <div className='delivered_paid_label'>
                            Delivered
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


    if (user.role_name==='counter'){
       return( renderStateButton(order))
    }else if(user.role_name === 'customer'){
       return ( renderStateLabel(order))
    }
}

