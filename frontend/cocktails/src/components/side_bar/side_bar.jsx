import React from "react";
import { SideBarPlaceBtn } from "./side_bar_place_btn";
import { SideBarProductBtn } from "./side_bar_product_btn";

export function SideBar(){

    return(
        <div className="side_bar_content">
            
            <div>
                <SideBarPlaceBtn />
            </div>
            <div>
                <SideBarProductBtn />
            </div>
        </div>
            
            

    )
    
}