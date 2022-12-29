import React from "react";
import { Link } from "react-router-dom";
import { SideBarPlaceBtn } from "./side_bar_place_btn";
import { SideBarProductBtn } from "./side_bar_product_btn";
import '../../styles/side_bar.scss';

export function SideBar(){

    return(
        <div className="side_bar_content">
            <div>
                <Link to={`placeList`}> 
                    <SideBarPlaceBtn />
                </Link>
            </div>
            <div>
                <Link to={`products`}>
                    <SideBarProductBtn />
                </Link>
            </div>
            <div>
                
            </div>
        </div>
            
            

    )
    
}