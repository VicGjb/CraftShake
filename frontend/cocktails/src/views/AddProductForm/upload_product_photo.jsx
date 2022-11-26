import React, {useState, useEffect} from 'react';
import { NetworkManager } from '../../components/network_manager';
import { useParams } from 'react-router-dom';
import { RegularButton } from '../../components/buttons/regular_button';

export function UploadProductFile ()  {
    // let [file, setFile] = useState();
    let file = ''
    let {productId} = useParams();
    let [uploadData,setUploadData] = useState(new FormData());
    let network_manager = new NetworkManager()

    function newFile(){
      uploadData.append('photo',file);  
      network_manager.upload_photo_product(productId, uploadData)
        .then((result) => {
          console.log(`Success` + result.data);
          window.location.href = '/test';
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function changeHandler(e){
      file = e.target.files[0]
      // setFile(e.target.files[0])
    }
    
    return (
      <form onSubmit={newFile} className='upload_photo_form'>
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
        
        
        
         <div className="upload_product_photo_submit_btn" type="submit">
            <RegularButton lable={'Change photo'}/>
         </div>
      </form>
    );
  };

