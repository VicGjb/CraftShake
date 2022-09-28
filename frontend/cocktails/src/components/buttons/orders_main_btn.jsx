import React from "react";
import {ReactComponent as Btn} from "../../svg/orders_main_btn.svg"
import { Link, useParams } from "react-router-dom";

export const OrdersMainBtn = () => {
    let {placeId} = useParams();
    let {placeName} = useParams();
    
    return(
        <button className="place_main_btn">
            <Link to={`/${placeName}/${placeId}/orders`}>
                <Btn className='icon_main_btn'></Btn>
            </Link>
        </button>
    )
}