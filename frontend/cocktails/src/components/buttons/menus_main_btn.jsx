import React from "react";
import {ReactComponent as Btn} from "../../svg/menus_main_btn.svg"
import { Link } from "react-router-dom";

export const MenusMainBtn = ({place}) =>{

    return(
        <button className="place_main_btn">
            <Link to='menus' state={{from: place}}>
                <Btn className='icon_main_btn'></Btn>
            </Link>
        </button>
    )
}