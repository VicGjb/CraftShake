import React from "react";
import {ReactComponent as Btn} from "../../svg/menu_icon.svg"
import { Link, useParams } from "react-router-dom";

export const MenusMainBtn = ({place}) =>{
    // let {placeName} = useParams();
    // let {placeId} = useParams();

    return(
        <button className="main_btn menu">
            <Link to={`/${place.name}/${place.id}/menus`}>
                <Btn className='icon_main_btn'></Btn>
                <div className="main_button_label">
                    Menus
                </div>
            </Link>
        </button>
    )
}