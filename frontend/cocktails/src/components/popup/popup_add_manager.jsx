import React from "react";
import { AddManagerOfPlace } from "../../views/AddManagerOfPlace/add_manager_of_place";

export function PopupAddManager({place, add_manager_active, setAdd_manager_active}){
    

    return(
        <div className={add_manager_active ? 'popup_wrapper active' : 'popup_wrapper'} onClick={()=>setAdd_manager_active(false)}>
            <div className="popup_content manager_popup" onClick={e => e.stopPropagation()}>
                <div className="popup_title">
                    Add manager for <br/>{place.name}
                </div>
                <AddManagerOfPlace place={place} setAdd_manager_active={setAdd_manager_active} />         
            </div>
        </div>
    )
}