import React from "react";
import {ReactComponent as Btn} from "../../svg/invoice_icon.svg"
import { Link, useParams } from "react-router-dom";
import '../../styles/main_btn.scss'

export const InvoicesMainBtn = () =>{
    let {placeId} = useParams();
    let {placeName} = useParams();
    return(
        <button className="main_btn invoice">
            <Link to={`/${placeName}/${placeId}/invoices`}>
                <Btn className='icon_main_btn'></Btn>
                <div className="main_button_label">
                    Invoices
                </div>
            </Link>
        </button>
    )
}