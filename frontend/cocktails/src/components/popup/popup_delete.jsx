import React from "react";
import { RegularButton } from "../buttons/regular_button";

export function PopupDelete({subject, delete_active, setDelete_active, func }){

    return(
        <div className={delete_active ? 'popup_wrapper active' : 'popup_wrapper'} onClick={()=>setDelete_active(false)}>
            <div className="popup_content" onClick={e => e.stopPropagation()}>
               <div  className="popup_delete_content"> 
                    <div className="popup_title">
                        Are you sure
                    </div>
                
                    <div className="popup_delete_masssege regular_text">
                        delete {subject}?
                    </div>
                    <div className="popup_delete_button_line">
                        <div onClick={()=>setDelete_active(false)}>
                            <RegularButton lable={'No'}></RegularButton>
                        </div>  
                        <div onClick={func}>
                            <RegularButton lable={'Yes'}></RegularButton>
                        </div> 
                    </div>
                       
                </div>
                                    
            </div>
        </div>
    )
}