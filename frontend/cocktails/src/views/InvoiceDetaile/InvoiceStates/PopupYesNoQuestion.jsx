import React from "react";
import { RegularButton } from "../../../components/buttons/regular_button";
import {ReactComponent as CloseIcon} from "../../../svg/close_icon.svg"
import '../../../styles/popup_yes_no_questions.scss'

export function PopupYesNoQuestion({
    yesNoQuestionActive, 
    setYesNoQuestionActive,
    message,
    yesFunction,
    noFunction
    }){
    
    function actionYes(){
        if (yesFunction){
            yesFunction()
        }
        setYesNoQuestionActive(false)
    }

    function actionNo(){
        if (noFunction){
            noFunction()
        }
        setYesNoQuestionActive(false)
    }


    return(
        <div className={yesNoQuestionActive ? 'popup_mobile_wrapper active' : 'popup_mobile_wrapper'} onClick={()=>setYesNoQuestionActive(false)}>
            <div className="popup_content_mobile" onClick={e => e.stopPropagation()}>
                <div className="popup_sevice_button_wrapper">
                    <div className="popup_close_button" onClick={()=>{setYesNoQuestionActive(false)}}>
                        <CloseIcon className='close_button_icon'/>
                    </div> 
                </div>
                    <div className="popup_title">
                        Are you sure?
                    </div>
                    <div className="popup_yes_now_masssege">
                        {message}
                    </div>
                    <div className="popup_yes_no_button_line">
                        <div onClick={actionNo}>
                            <RegularButton lable={'No'}></RegularButton>
                        </div>  
                        <div onClick={actionYes}>
                            <RegularButton lable={'Yes'}></RegularButton>
                        </div> 
                    </div>
                       
                </div>
        </div>
    )
}