import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SideBarPlaceBtn } from "./side_bar_place_btn";
import { SideBarProductBtn } from "./side_bar_product_btn";
import { useManeContext } from "../main_context";


import '../../styles/side_bar.scss';

export function SideBar(){
    let mainContext = useManeContext()
    let user = mainContext.getUserFromMainContext()


    if (user.role_name==='counter'){  

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
    
            </div>
                
                
    
        )
    }

    
}