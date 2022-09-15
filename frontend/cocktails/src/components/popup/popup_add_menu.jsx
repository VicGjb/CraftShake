import React from "react";
import { AddMenu } from "../../views/AddMenu/add_menu";
import { RegularButton } from "../buttons/regular_button";

export function PopupAddMenu({add_menu_active, setAdd_menu_active, place}){

    return(
        <div className={add_menu_active ? 'popup_wrapper active' : 'popup_wrapper'} onClick={()=>setAdd_menu_active(false)}>
            <div className="popup_content" onClick={e => e.stopPropagation()}>
                <div className="popup_title">
                    Add menu for <br/>{place.name}
                </div>
                <AddMenu place={place} setAdd_menu_active={setAdd_menu_active}/>         
            </div>
        </div>
    )

}