import React from "react";
import { Route, Routes } from "react-router-dom";
import { PlaceListMobile } from "./place_list_mobile";
import { ProductListMobile } from "../ProductList/ProductListMobile";
export function MobileRoute(){
    return(
        <Routes>
            <Route path='placeListMobile'
            element={<PlaceListMobile/>}
            />
            <Route path='productListMobile'
            element={<ProductListMobile/>}
            />
        </Routes> 
    )
}