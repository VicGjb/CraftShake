import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { RegularButton } from '../../components/buttons/regular_button';

export function UploadProductFile ()  {
    let [file, setFile] = useState();
    let {productId} = useParams();
    let [uploadData,setUploadData] = useState(new FormData());

    function newFile(){
      uploadData.append('photo',file);  

      axios
      .post(`http://127.0.0.1:8000/api/counter/product/upload-photo/${productId}`, uploadData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log(`Success` + result.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }

    function changeHandler(e){
      setFile(e.target.files[0])
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

