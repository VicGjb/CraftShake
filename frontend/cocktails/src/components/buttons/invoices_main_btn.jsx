import React from "react";
import {ReactComponent as Btn} from "../../svg/invoices_main_btn.svg"
import { Link } from "react-router-dom";

export const InvoicesMainBtn = ({place}) =>{

    return(
        <button className="place_main_btn">
            <Link to='invoices' state={{from: place}}>
                <Btn className='icon_main_btn'></Btn>
            </Link>
        </button>
    )
}