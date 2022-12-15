import React from "react";
import { RegularButton } from "../buttons/regular_button";
export function PopupRegularMessage({message, regular_message_active, setRegular_message_active, customFunction}){

    function closePopup(){
        if(customFunction){
            customFunction()
        }
        setRegular_message_active(false)
    }

    return(
        <div className={regular_message_active ? 'popup_wrapper active' : 'popup_wrapper'} onClick={()=>setRegular_message_active(false)}>
            <div className="popup_content message_content" onClick={e => e.stopPropagation()}>
                <div className="message_content">
                    <div className="popup_title">
                        Warrning <br/>
                    </div>
                    <div className="popup_regular_message__message regular_text">
                        {message}
                    </div>
                    <div className="button_set" onClick={closePopup}>
                        <RegularButton lable={'Ok'}/>
                    </div> 
                </div>
            </div>
        </div>
    )
}