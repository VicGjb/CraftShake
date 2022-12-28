import React from "react";
import { RegularButton } from "../buttons/regular_button";
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"
import '../../styles/popup_regular_message.scss'

export function PopupRegularMessage({
    message, 
    regular_message_active, 
    setRegular_message_active, 
    customFunction
    }){

    function closePopup(){
        if(customFunction){
            customFunction()
        }
        setRegular_message_active(false)
    }

    return(
        <div className={regular_message_active ? 'popup_mobile_wrapper active' : 'popup_wrapper'} onClick={closePopup}>
            <div className="popup_content_mobile regular-message" onClick={e => e.stopPropagation()}>
                <div className="popup_sevice_button_wrapper">
                    <div className="popup_close_button" onClick={closePopup}>
                        <CloseIcon className='close_button_icon'/>
                    </div> 
                </div>
                    <div className="popup_title regular-message">
                        Warrning!
                    </div>
                    <div className="popup_yes_now_masssege">
                        {message}
                    </div>
                    <div className="button_set" onClick={closePopup}>
                        <RegularButton lable={'Ok'}/>
                    </div> 
            </div>
        </div>
    )
}