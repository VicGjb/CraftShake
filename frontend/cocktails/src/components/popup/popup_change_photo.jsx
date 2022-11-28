import React,{useState} from "react";
import { UploadProductFile } from "../../views/AddProductForm/upload_product_photo";
import { NetworkManager } from '../../components/network_manager';
import { useParams } from 'react-router-dom';
import { RegularButton } from '../../components/buttons/regular_button';

export function PopupUploadProductPhoto({upload_product_photo_active, setUploadProductPhotoActive}){
    // let [file, setFile] = useState()
    let file = ''
    let {productId} = useParams();
    let [uploadData,setUploadData] = useState(new FormData());
    let network_manager = new NetworkManager()

    function newFile(){
      uploadData.append('photo',file);  
      network_manager.upload_photo_product(productId, uploadData)
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
        console.log('Handle change photo')
        // setFile(e.target.files[0])
    }
    return(
            <div className={upload_product_photo_active ? 'popup_wrapper active' : 'popup_wrapper'} onClick={()=>setUploadProductPhotoActive(false)}>
                <div className="popup_add_product_content" onClick={e => e.stopPropagation()}>
                    <div className="popup_title">
                        Upload photo
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
                                <RegularButton lable={'Change photo'}/>
                            </div>
                        </div>
                    </div>              
                </div>
            </div>  
    )
}