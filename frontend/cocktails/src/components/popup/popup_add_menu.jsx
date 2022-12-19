import React from "react";
import { useParams } from "react-router-dom";
import { AddMenu } from "../../views/AddMenu/add_menu";
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"
import '../../styles/popup_add_menu.scss'

export function PopupAddMenu({add_menu_active, setAdd_menu_active}){
    let {placeName} = useParams();
    let {placeId} = useParams();
    return(
        <div className={add_menu_active ? 'popup_mobile_wrapper active' : 'popup_mobile_wrapper'} onClick={()=>setAdd_menu_active(false)}>
            <div className="popup_mobile_content create_menu" onClick={e => e.stopPropagation()}>
                <div className="popup_filter_sevice_button_wrapper">
                    <div className="popup_filter_close_button" onClick={()=>{setAdd_menu_active(false)}}>
                        <CloseIcon className='close_button_icon'/>
                    </div> 
                </div>

                <div className="popup_title add_menu">
                    Add menu for {placeName}
                </div>
                <AddMenu setAdd_menu_active={setAdd_menu_active}/>         
                <div className="popup_footer">
                </div>
            </div>
        </div>
    )

}