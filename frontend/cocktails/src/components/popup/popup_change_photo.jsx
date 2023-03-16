import React,{useState} from "react";
import { NetworkManager } from '../../api/network_manager';
import { useParams } from 'react-router-dom';
import { RegularButton } from '../../components/buttons/regular_button';
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"
import { PhotoUploader } from "../PhotoUploader";
import '../../styles/popup_upload_photo.scss'

export function PopupUploadProductPhoto({upload_product_photo_active, setUploadProductPhotoActive, setProduct}){
    let {productId} = useParams();
    let uploadData = new FormData();
    let network_manager = new NetworkManager()

    function newFile(){
      network_manager.upload_photo_product(productId, uploadData)
        .then(response => {
          //console.log(`Success`,response);
          setProduct(response.data)
          setUploadProductPhotoActive(false)
        })
        .catch(error => {
          //console.log(error);
          throw error
        });
    }

    return(
            <div className={upload_product_photo_active ? 'popup_mobile_wrapper active' : 'popup_mobile_wrapper'} onClick={()=>setUploadProductPhotoActive(false)}>
                <div className="popup_mobile_content upload_photo" onClick={e => e.stopPropagation()}>
                    <div className="popup_filter_sevice_button_wrapper">
                        <div className="popup_filter_close_button" onClick={()=>{setUploadProductPhotoActive(false)}}>
                            <CloseIcon className='close_button_icon'/>
                        </div> 
                    </div>
                    <div className="popup_title upload_photo">
                        Upload photo
                    </div>
                    
                    <PhotoUploader
                        uploadData={uploadData}
                    />

                    <div className="upload_product_photo_button"  onClick={newFile}>
                        <RegularButton lable={'Add photo'}/>
                    </div>

                    
                          
                </div>
            </div>  
    )
}