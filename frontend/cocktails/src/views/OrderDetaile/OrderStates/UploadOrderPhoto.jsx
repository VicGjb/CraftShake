import React from "react";
import { NetworkManager } from "../../../components/network_manager";
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context";
import { RegularButton } from "../../../components/buttons/regular_button";
import { useState } from "react";

export function UploadOrderPhotoPopup({upload_photo_active, setUploadPhotoActive}){
    let network_manager = new NetworkManager()
    let orderItemContext = useOrderItemListContext()
    let orderId = orderItemContext.getOrderIdContext
    let file = ''
    let [uploadData,setUploadData] = useState(new FormData());

    function newFile(){
        uploadData.append('photo',file);  
        network_manager.set_order_delivered(orderId, uploadData)
          .then((result) => {
            console.log(`Success` + result.data);
            window.location.reload()
          })
          .catch((err) => {
            console.log(err);
          });
      }

    function changeHandler(e){
        file = e.target.files[0]
    }

    return(
        <div className={upload_photo_active ? 'popup_wrapper active' : 'popup_wrapper'} onClick={()=>setUploadPhotoActive(false)}>
            <div className="popup_add_product_content" onClick={e => e.stopPropagation()}>
                <div className="popup_title">
                    You must add photo
                </div>
                <div className="popup_add_product_form_wrapper">
                    <div className='upload_photo_form'>
                        <div className="file_input">
                            <input
                                id='file'
                                className='upload_photo'
                                type="file"
                                onChange={changeHandler}
                                />
                            <label htmlFor='file'>
                                <RegularButton lable={'Choise photo'}/>
                            </label>
                        </div>
                        
                        <div className="upload_product_photo_submit_btn"  onClick={newFile}>
                            <RegularButton lable={'set Delivered'}/>
                        </div>
                    </div>
                </div>              
            </div>
        </div>  


    )
}