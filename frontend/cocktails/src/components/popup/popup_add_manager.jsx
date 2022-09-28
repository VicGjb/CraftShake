import React from "react";
import { useParams } from "react-router-dom";
import { AddManagerOfPlace } from "../../views/AddManagerOfPlace/add_manager_of_place";

export function PopupAddManager({add_manager_active, setAdd_manager_active}){
    let {placeId} = useParams();
    let {placeName} = useParams();

    return(
        <div className={add_manager_active ? 'popup_wrapper active' : 'popup_wrapper'} onClick={()=>setAdd_manager_active(false)}>
            <div className="popup_content manager_popup" onClick={e => e.stopPropagation()}>
                <div className="popup_title">
                    Add manager for <br/>{placeName}
                </div>
                <AddManagerOfPlace setAdd_manager_active={setAdd_manager_active} />         
            </div>
        </div>
    )
}