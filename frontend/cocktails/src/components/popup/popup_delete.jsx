import React from "react";
import { RegularButton } from "../buttons/regular_button";
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"
import { useManagersContext } from "../../views/ManagersList/ManagersContext";
import '../../styles/popup_delete.scss'
import { useMainContext } from "../../router/main_context";

export function PopupDelete({
    subject, 
    delete_active, 
    setDelete_active, 
    func 
    }){

    let mainContext = useMainContext()
    
    function closePopup(){
        setDelete_active(false)
        mainContext.analyticManager.setEventData(`Delete ${subject} - close button`)
    }
    function deleteSubject(){
        func()
        mainContext.analyticManager.setEventData(`Delete ${subject} - YES button`)
    }
    return(
        <div className={delete_active ? 'popup_mobile_wrapper active' : 'popup_mobile_wrapper'} onClick={closePopup}>
            <div className="popup_mobile_content delete_popup" onClick={e => e.stopPropagation()}>
                <div className="popup_filter_sevice_button_wrapper">
                    <div className="popup_filter_close_button" onClick={closePopup}>
                        <CloseIcon className='close_button_icon'/>
                    </div> 
                </div>
                    <div className="popup_title delete_popup">
                        Are you sure
                    </div>
                
                    <div className="popup_delete_masssege">
                        Delete {subject}?
                    </div>
                    <div className="popup_delete_button_line">
                        <div className="popup_delete_button_wrpper" onClick={closePopup}>
                            <RegularButton lable={'No'}></RegularButton>
                        </div>  
                        <div className="popup_delete_button_wrpper" onClick={deleteSubject}>
                            <RegularButton lable={'Yes'}></RegularButton>
                        </div> 
                    </div>          
            </div>
        </div>
    )
}