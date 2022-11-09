import React from "react";
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
  } from 'react-router-dom';
import { CheckAuth } from "./auth_service";
import { MainContextProvider } from "./main_context";
import { OrderList } from "../views/OrderList/order_list";
import { OrderDetaile } from "../views/OrderDetaile/order_detaile";
import { PlaceDetaile } from "../views/PlaceDetaile/place_detaile";
import { PlaceList } from "../views/PlaceList/place_list";
import { ProductList } from "../views/ProductList/product_list";
import { ProductDetaile } from "../views/ProductDetaile/product_detaile";
import { Layout } from "./layout";
import { LayoutPlace } from "./layout_place";
import { InvoiceList } from "../views/InvoiceList/invoice_list";
import { InvoiceDetaile } from "../views/InvoiceDetaile/invoice_detaile";
import { MenuList } from "../views/MenuList/menu_list";
import { MenuDetaile } from "../views/MenuDetaile/menu_detaile";
import { ManagersList } from "../views/ManagersList/managers_list";
import { AuthLayout } from "./auth_layout";
import { GetCodeGoogleLogin } from "../views/Auth/get_code_google_login";
import SignIn from "../views/Auth/login";

export function Routing(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<MainContextProvider><Layout/></MainContextProvider>}>
                    <Route element={<AuthLayout/>}>
                        <Route path='placeList' element={<PlaceList/>}/>    
                        <Route path=':placeName/:placeId/*' element={<LayoutPlace/>}>
                            <Route path='detaile' element={<PlaceDetaile/>}/>
                            <Route path='orders' element={<OrderList/>}/>
                            <Route path='orders/:orderId/*' element={<OrderDetaile/>}/>
                            <Route path='invoices' element={<InvoiceList/>}/>
                            <Route path='invoices/:invoiceId/*' element={<InvoiceDetaile/>}/>
                            <Route path='menus' element={<MenuList/>} />
                            <Route path='menus/:menuId/*' element={<MenuDetaile/>}/>
                            <Route path='managers/' element={<ManagersList/>}/>
                        </Route>
                        <Route path='products/' element={<ProductList/>}/>
                        <Route path='products/:productId' element={<ProductDetaile/>}/>
                    </Route>    
                        <Route path='login' element={<SignIn/>}/>      
                </Route>  
                <Route path='get_code' element={<GetCodeGoogleLogin/>}/>
            </Routes>
        </Router>
    )
  }