import React from "react";
import {ReactComponent as Btn} from "../../svg/order_icon.svg"
import { Link, useParams } from "react-router-dom";

export const OrdersMainBtn = () => {
    let {placeId} = useParams();
    let {placeName} = useParams();
    
    return(
        <button className="main_btn order">
            <Link to={`/${placeName}/${placeId}/orders`}>
                <Btn className='icon_main_btn'></Btn>
                <div className="main_button_label">
                    Orders
                </div>
            </Link>
        </button>
    )
}