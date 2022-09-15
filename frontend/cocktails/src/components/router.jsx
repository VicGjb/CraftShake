import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from 'react-router-dom';
import { OrderList } from "../views/OrderList/order_list";
import { OrderDetaile } from "../views/OrderDetaile/order_detaile";
import { PlaceDetaile } from "../views/PlaceDetaile/place_detaile";
import { PlaceList } from "../views/PlaceList/place_list";
import { ProductList } from "../views/ProductList/product_list";
import { ProductDetaile } from "../views/ProductDetaile/product_detaile";
import { Layout } from "./layout";
import { InvoiceList } from "../views/InvoiceList/invoice_list";
import { InvoiceDetaile } from "../views/InvoiceDetaile/invoice_detaile";
import { MenuList } from "../views/MenuList/menu_list";
import { MenuDetaile } from "../views/MenuDetaile/menu_detaile";
import { ManagersList } from "../views/ManagersList/managers_list";

export function Routing(){

    return(
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path='placeList' element={<PlaceList/>}/>
                    <Route path=':placeId/:placeName' element={<PlaceDetaile/>}/>
                    <Route path=':placeId/:placeName/orders' element={<OrderList/>}/>
                    <Route path='orders/:orderId/*' element={<OrderDetaile/>}/>
                    <Route path='products/' element={<ProductList/>}/>
                    <Route path='products/:productId' element={<ProductDetaile/>}/>
                    <Route path=':placeId/:placeName/invoices' element={<InvoiceList/>}/>
                    <Route path='invoices/:invoiceId/*' element={<InvoiceDetaile/>}/>
                    <Route path=':placeId/:placeName/menus' element={<MenuList/>} />
                    <Route path='menus/:menuId/*' element={<MenuDetaile/>}/>
                    <Route path=':placeId/:PlaceName/managers/' element={<ManagersList/>}/>
                </Route>
            </Routes>
        </Router>
    )
  }

