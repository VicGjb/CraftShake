import React from "react";
import { useState } from "react";
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"
import { RegularButton } from "../buttons/regular_button";
import { PopupCreateReferralUrl } from "./PopupCreateReferralUrl";
import { PopupAddPlace } from "./popup_add_place";
import '../../styles/popup_add_menu_place_list.scss'

export function PopupAddMenuPlaceList({
    popupAddMenuPlaceListActive,
    setPopupAddMenuPlaceListActive,   
    }){

    let [createReferallUrlActive, setCreateReferallUrlActive] = useState(false)
    let [add_place_active, setAdd_place_active] = useState(false)

    return(
        <div className={popupAddMenuPlaceListActive ? 'popup_mobile_wrapper active' : 'popup_wrapper'} onClick={()=>setPopupAddMenuPlaceListActive(false)}>
            <div className="popup_mobile_content_add_menu_position" onClick={e => e.stopPropagation()}>
                <div className="popup_filter_sevice_button_wrapper">
                    <div className="popup_filter_close_button" onClick={()=>{setPopupAddMenuPlaceListActive(false)}}>
                        <CloseIcon className='close_button_icon'/>
                    </div> 
                </div>
                <div className="popup_title add_menu_position">
                    Menu
                </div>
                <div className="popup-content">
                    <div className="popup-button-row" onClick={()=>{setAdd_place_active(true)}}>
                        <RegularButton lable={'Add new place'}/>
                    </div>
                    <div className="popup-button-row" onClick={()=>{setCreateReferallUrlActive(true)}}>
                        <RegularButton lable={'Create referral URL'}/>
                    </div>
                </div>
            </div>
            <PopupCreateReferralUrl
                createReferallUrlActive={createReferallUrlActive}
                setCreateReferallUrlActive={setCreateReferallUrlActive}
                />

            <PopupAddPlace
                    add_place_active={add_place_active} 
                    setAdd_place_active={setAdd_place_active} 
                    newPlace={true}
                    setPopupAddMenuPlaceListActive={setPopupAddMenuPlaceListActive}
                    />
        </div>
    )
}