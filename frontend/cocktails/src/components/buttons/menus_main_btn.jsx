import React from "react";
import {ReactComponent as Btn} from "../../svg/menus_main_btn.svg"
import { Link, useParams } from "react-router-dom";

export const MenusMainBtn = ({place}) =>{
    // let {placeName} = useParams();
    // let {placeId} = useParams();

    return(
        <button className="place_main_btn">
            <Link to={`/${place.name}/${place.id}/menus`}>
                <Btn className='icon_main_btn'></Btn>
            </Link>
        </button>
    )
}