import React from "react";
import { NetworkManager } from "../../../components/network_manager";
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context";
import { RegularButton } from "../../../components/buttons/regular_button";
import { useState } from "react";
import { PhotoUploader } from "../../PhotoUploader";
import {ReactComponent as CloseIcon} from "../../../svg/close_icon.svg"

export function UploadOrderPhotoPopup({upload_photo_active, setUploadPhotoActive}){
    let network_manager = new NetworkManager()
    let orderItemContext = useOrderItemListContext()
    let orderId = orderItemContext.getOrderContext.id
    let uploadData = new FormData();

    function newFile(){ 
        network_manager.set_order_delivered(orderId, uploadData)
          .then(response => {
            console.log(`Success`,response);
            setUploadPhotoActive(false)
            orderItemContext.setOrderContext(response)
          })
          .catch((err) => {
            console.log(err);
          });
      }


    return(
        <div className={upload_photo_active  ? 'popup_mobile_wrapper active' : 'popup_wrapper'} onClick={()=>setUploadPhotoActive(false)}>
            <div className="popup_mobile_content upload_photo" onClick={e => e.stopPropagation()}>
                <div className="popup_filter_sevice_button_wrapper">
                    <div className="popup_filter_close_button" onClick={()=>{setUploadPhotoActive(false)}}>
                        <CloseIcon className='close_button_icon'/>
                    </div> 
                </div>
                
                <div className="popup_title upload_photo">
                    You must add photo
                </div>
                <PhotoUploader
                    uploadData={uploadData}
                />
               
                <div className="upload_product_photo_button"  onClick={newFile}>
                    <RegularButton lable={'Set delivered'}/>
                </div>
                             
            </div>
        </div>  


    )
}