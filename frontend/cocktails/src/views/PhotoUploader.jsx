import React from "react";
import { useState } from "react";
import '../styles/photo_uploader.scss'
import {ReactComponent as UploadIcon} from '../svg/upload_icon.svg'
import {ReactComponent as DeleteIcon} from '../svg/delete_icon.svg'
import {ReactComponent as ImageFileIcon} from '../svg/image_file_icon.svg'

export function PhotoUploader({uploadData}){

    let [photo,setPhoto] = useState(null)
    let [fileName, setFileName] = useState('No selected file')

    return(
        <div className="photo-uploader_wrapper">
            <form className="photo-uploader_form" onClick={()=>document.querySelector(".upload_photo_input").click()}>
                <input 
                    id='file'
                    className='upload_photo_input'
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={({target:{files}})=>{
                        setFileName(files[0].name)
                        if(files){
                            setPhoto(URL.createObjectURL(files[0]))
                            uploadData.append('photo', files[0])
                            console.log('uplodDAta', uploadData.values())
                        }
                    }}
                />
                {photo?
                <img src={photo}/>
                :
                <div className="upload-photo_content">
                    <UploadIcon className='upload_icon'/>
                    <p>Browse files to upload</p>
                </div>
                }
            </form>

            <div className='upload-photo_state-bar'> 
                <ImageFileIcon className='image-file-icon'/>
                <div>
                    {fileName}
                    <span 
                    onClick={()=>{
                        setFileName('No selected file')
                        setPhoto(null)
                        document.getElementById('file').value=''
                        uploadData.delete('photo')
                        console.log('UploadData remove',uploadData.values())
                        }}> 
                        <DeleteIcon className='delete-file-icon'/>
                    </span> 
                </div>
                 
            </div>
        </div>

    )
}