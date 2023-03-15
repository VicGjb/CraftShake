// import React from "react";
// import {
//     BrowserRouter as Router,
//     Route,
//     Routes,
//   } from 'react-router-dom';
// import { useEffect } from "react";
// import ReactGA from 'react-ga';
// import { MainContextProvider } from "./main_context";
// import { OrderList } from "../views/OrderList/order_list";
// import { OrderDetaile } from "../views/OrderDetaile/order_detaile";
// import { PlaceDetaile } from "../views/PlaceDetaile/place_detaile";
// import { PlaceList } from "../views/PlaceList/place_list";
// import { ProductList } from "../views/ProductList/product_list";
// import { ProductDetaile } from "../views/ProductDetaile/product_detaile";
// import { Layout } from "./layout";
// import { LayoutPlace } from "./layout_place";
// import { InvoiceList } from "../views/InvoiceList/invoice_list";
// import { InvoiceDetaile } from "../views/InvoiceDetaile/InvoiceDetaile";
// import { MenuList } from "../views/MenuList/menu_list";
// import { MenuDetaile } from "../views/MenuDetaile/MenuDetaile";
// import { ManagersList } from "../views/ManagersList/ManagersList";
// import { AuthLayout } from "./auth_layout";
// import { GetCodeGoogleLogin } from "../views/Auth/get_code_google_login";
// import { SignIn } from "../views/Auth/login";
// import { PersonalAccount } from "../views_customer/personal_account";
// import { ReferralRegistration } from "../views/Auth/ReferralRegistration";
// import { HomePage } from "../views/HomePage/HomePage";
// import { MainPage } from "../views/TestProps/MainPage";
// import { PageTracking } from "./analytic";

// export function Routing(){

//     return(
        
//         <Router>
//             <Routes>
            
//                 <Route path="" element={<MainContextProvider><PageTracking/><Layout/></MainContextProvider>}>
//                     <Route element={<AuthLayout/>}>
//                             <Route path='placeList/*' element={<PlaceList/>}/>    
//                             <Route path=':placeName/:placeId/*' element={<LayoutPlace/>}>
//                                 <Route path='detaile' element={<PlaceDetaile/>}/>
//                                 <Route path='orders' element={<OrderList/>}/>
//                                 <Route path='orders/:orderId/*' element={<OrderDetaile/>}/>
//                                 <Route path='orders/new_order/*' element={<OrderDetaile/>}/>
//                                 <Route path='invoices' element={<InvoiceList/>}/>
//                                 <Route path='invoices/:invoiceId/*' element={<InvoiceDetaile/>}/>
//                                 <Route path='menus' element={<MenuList/>}/>
//                                 <Route path='menus/:menuId/*' element={<MenuDetaile/>}/>
//                                 <Route path='managers/' element={<ManagersList/>}/>
//                             </Route>
//                             <Route path='products/' element={<ProductList/>}/>
//                             <Route path='products/:productId' element={<ProductDetaile/>}/>
//                             <Route path=':userId/' element={<PersonalAccount/>}/>
//                             <Route path='customer/:userID' element={<PersonalAccount/>}/>
//                             <Route path='customer/:userID/:placeId/' element = {<LayoutPlace/>}>
//                             <Route path='main' element={<PlaceDetaile/>}/>
//                         </Route>
//                     </Route>    
//                     <Route path='/' element={<HomePage/>} />
//                 </Route> 
//                 <Route path='login' element={<MainContextProvider><SignIn/></MainContextProvider>}/> 
//                 {/* <Route path='reregistration/' element={<ReferralRegistration/>}/> */}
//                 <Route path='reregistration/:referralCode' element={<ReferralRegistration/>}/>

//                 <Route path='test' element={<MainPage/>}/>
//                 <Route path='get_code' element={<GetCodeGoogleLogin/>}/>
//             </Routes>
//         </Router>
//     )
//   }




import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from 'react-router-dom';
import { useEffect } from "react";
import ReactGA from 'react-ga';
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
import { InvoiceDetaile } from "../views/InvoiceDetaile/InvoiceDetaile";
import { MenuList } from "../views/MenuList/menu_list";
import { MenuDetaile } from "../views/MenuDetaile/MenuDetaile";
import { ManagersList } from "../views/ManagersList/ManagersList";
import { AuthLayout } from "./auth_layout";
import { GetCodeGoogleLogin } from "../views/Auth/get_code_google_login";
import { SignIn } from "../views/Auth/login";
import { PersonalAccount } from "../views_customer/personal_account";
import { ReferralRegistration } from "../views/Auth/ReferralRegistration";
import { HomePage } from "../views/HomePage/HomePage";
import { MainPage } from "../views/HomePage/MainPage";
import { PageTracking } from "./analytic";
import { SoundButton } from "./sound_button";

export function Routing(){

    return(
        <MainContextProvider>
        <Router>
            <Routes>
            
                <Route path="" element={<><PageTracking/><Layout/></>}>
                    <Route element={<AuthLayout/>}>
                            <Route path='placeList/*' element={<PlaceList/>}/>    
                            <Route path=':placeName/:placeId/*' element={<LayoutPlace/>}>
                                <Route path='detaile' element={<PlaceDetaile/>}/>
                                <Route path='orders' element={<OrderList/>}/>
                                <Route path='orders/:orderId/*' element={<OrderDetaile/>}/>
                                <Route path='orders/new_order/*' element={<OrderDetaile/>}/>
                                <Route path='invoices' element={<InvoiceList/>}/>
                                <Route path='invoices/:invoiceId/*' element={<InvoiceDetaile/>}/>
                                <Route path='menus' element={<MenuList/>}/>
                                <Route path='menus/:menuId/*' element={<MenuDetaile/>}/>
                                <Route path='managers/' element={<ManagersList/>}/>
                            </Route>
                            <Route path='products/' element={<ProductList/>}/>
                            <Route path='products/:productId' element={<ProductDetaile/>}/>
                            <Route path=':userId/' element={<PersonalAccount/>}/>
                            <Route path='customer/:userID' element={<PersonalAccount/>}/>
                            <Route path='customer/:userID/:placeId/' element = {<LayoutPlace/>}>
                            <Route path='main' element={<PlaceDetaile/>}/>
                        </Route>
                    </Route>    
                    <Route path='/' element={<HomePage/>} />
                    
                </Route> 
                <Route path='login' element={<SignIn/>}/> 
                <Route path='vitos_button' element={<SoundButton/>}/>
                <Route path='main' element={<MainPage/>} />
                {/* <Route path='reregistration/' element={<ReferralRegistration/>}/> */}
                <Route path='reregistration/:referralCode' element={<ReferralRegistration/>}/>

                // <Route path='test' element={<MainPage/>}/>
                <Route path='get_code' element={<GetCodeGoogleLogin/>}/>
            </Routes>
        </Router>
        </MainContextProvider>
    )
  }