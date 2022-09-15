import React from "react";
import { UploadProductFile } from "../../views/AddProductForm/upload_product_photo";
export function PopupUploadProductPhoto({upload_product_photo_active, setUploadProductPhotoActive}){
return(

    <div className={upload_product_photo_active ? 'popup_wrapper active' : 'popup_wrapper'} onClick={()=>setUploadProductPhotoActive(false)}>
        <div className="popup_add_product_content" onClick={e => e.stopPropagation()}>
            <div className="popup_title">
                Upload photo
            </div>
            <div className="popup_add_product_form_wrapper">
                <UploadProductFile/> 
            </div>              
        </div>
    </div>
)
}