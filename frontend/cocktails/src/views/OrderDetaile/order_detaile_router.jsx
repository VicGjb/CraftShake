import React from "react";
import { Route, Routes } from "react-router-dom";
import { MenuPositions } from "./menu_position/menu_position";

export function OrderDetaileMenuRoute(){
    return(
        <Routes>
            <Route path='menu/:menuId'
            element={<MenuPositions/>}
            />
        </Routes> 
    )
}