import React from "react";
import { NetworkManager } from "../../../components/network_manager";
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context";
import { RegularButton } from "../../../components/buttons/regular_button";
import { PhotoUploader } from "../../PhotoUploader";
import {ReactComponent as CloseIcon} from "../../../svg/close_icon.svg"

export function UploadOrderPhotoPopup({upload_photo_active, setUploadPhotoActive}){
    let network_manager = new NetworkManager()
    let orderDetaileContext = useOrderItemListContext()
    let orderId = orderDetaileContext.getOrderContext.id
    let uploadData = new FormData();
    

    function newFile(){ 
        network_manager.set_order_delivered(orderId, uploadData)
          .then(response => {
            console.log(`Success`,response);
            orderDetaileContext.setUploadPhotoActive(false)
            orderDetaileContext.setOrderContext(response)
          })
          .catch((err) => {
            console.log(err);
          });
      }


    return(
        <div className={orderDetaileContext.uploadPhotoActive  ? 'popup_mobile_wrapper active' : 'popup_wrapper'} onClick={()=>orderDetaileContext.setUploadPhotoActive(false)}>
            <div className="popup_mobile_content upload_photo" onClick={e => e.stopPropagation()}>
                <div className="popup_filter_sevice_button_wrapper">
                    <div className="popup_filter_close_button" onClick={()=>{orderDetaileContext.setUploadPhotoActive(false)}}>
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