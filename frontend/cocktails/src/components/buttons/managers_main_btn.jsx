import React from "react";
import {ReactComponent as Btn} from "../../svg/manager_icon.svg";
import { Link, useParams } from "react-router-dom";

export const ManagersMainBtn = () =>{
    let{placeName} = useParams();
    let{placeId} = useParams();
    return(
        <button className="main_btn manager">
            <Link to ={`/${placeName}/${placeId}/managers`}>
                <Btn className='icon_main_btn'></Btn>
                <div className="main_button_label">
                    Managers
                </div>
            </Link>
            
        </button>
    )
}