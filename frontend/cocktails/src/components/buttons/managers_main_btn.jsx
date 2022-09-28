import React from "react";
import {ReactComponent as Btn} from "../../svg/managers_main_btn.svg";
import { Link, useParams } from "react-router-dom";

export const ManagersMainBtn = () =>{
    let{placeName} = useParams();
    let{placeId} = useParams();
    return(
        <button className="place_main_btn">
            <Link to ={`/${placeName}/${placeId}/managers`}>
                <Btn className='icon_main_btn'></Btn>
            </Link>
        </button>
    )
}