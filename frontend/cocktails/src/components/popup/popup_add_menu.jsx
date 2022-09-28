import React from "react";
import { useParams } from "react-router-dom";
import { AddMenu } from "../../views/AddMenu/add_menu";


export function PopupAddMenu({add_menu_active, setAdd_menu_active}){
    let {placeName} = useParams();
    let {placeId} = useParams();
    return(
        <div className={add_menu_active ? 'popup_wrapper active' : 'popup_wrapper'} onClick={()=>setAdd_menu_active(false)}>
            <div className="popup_content" onClick={e => e.stopPropagation()}>
                <div className="popup_title">
                    Add menu for <br/>{placeName}
                </div>
                <AddMenu setAdd_menu_active={setAdd_menu_active}/>         
            </div>
        </div>
    )

}