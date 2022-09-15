import React from "react";
import {ReactComponent as Btn} from "../../svg/orders_main_btn.svg"
import { Link } from "react-router-dom";

export const OrdersMainBtn = ({place}) =>{
    console.log('OrderBTN',place)
    return(
        <button className="place_main_btn">
            <Link to = {`orders`} state={{from: place}}>
                <Btn className='icon_main_btn'></Btn>
            </Link>
        </button>
    )
}