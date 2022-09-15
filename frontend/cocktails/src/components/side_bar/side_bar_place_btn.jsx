import React from "react";
import { Link } from "react-router-dom";
import {ReactComponent as Btn} from "../../svg/side_bar_place_btn.svg";

export const SideBarPlaceBtn=()=>{

    return(
        <button className="side_bar_btn">
            <Link to={`placeList`}>
                <Btn className='side_bar_icon'></Btn>
            </Link>
        </button>
    )
}