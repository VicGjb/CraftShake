import React from "react";
import {ReactComponent as Btn} from "../../svg/side_bar_product_btn.svg";
import { Link } from "react-router-dom";

export const SideBarProductBtn =()=>{

    return(
        <button className="side_bar_btn">
            <Link to={'products/'}>
                <Btn className='side_bar_icon'></Btn>
            </Link>
        </button>
    )
}