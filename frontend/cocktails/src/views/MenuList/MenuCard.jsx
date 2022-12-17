import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import '../../styles/menu_card.scss'
import { CurrentMenuChackBox } from "./menu_list_current_btn";

export function MenuCard({menu}){
    let {placeId} = useParams();
    let {placeName} = useParams();

    return(
        <div className="menu_card_wrapper">
            <Link to={`/${placeName}/${placeId}/menus/${menu.id}`} className='link_to_menu_detile'></Link>
            <div className="menu_card_slot id">#{menu.id}</div>
            <div className="menu_card_slot name">{menu.name}</div>
            <CurrentMenuChackBox menu={menu}/>
        </div>
    )

}