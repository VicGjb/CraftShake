import React from "react";
import { AddPlace } from "../../views/AddPlaceForm/add_place";

export function PopupAddPlace({add_place_active, setAdd_place_active,}){

    return(
        <div className={add_place_active ? 'popup_wrapper active' : 'popup_wrapper'} onClick={()=>setAdd_place_active(false)}>
            <div className="popup_content place_popup" onClick={e => e.stopPropagation()}>
                <div className="popup_title">
                    Add new place
                </div>
                <AddPlace setAdd_place_active={setAdd_place_active} />         
            </div>
        </div>
    )
}