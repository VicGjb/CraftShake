import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import '../../styles/side_bar_burger.scss'
import { useManeContext } from "../main_context";
import { SideBarPlaceBtn } from "./side_bar_place_btn";
import { SideBarProductBtn } from "./side_bar_product_btn";

export function SideBarBurger(){

    let mainContext = useManeContext()

    useEffect(() => {
        mainContext.getSideMenuBurgerActiv && (document.body.style.overflow = 'hidden');
        !mainContext.getSideMenuBurgerActiv && (document.body.style.overflow = 'unset');
     }, [mainContext.getSideMenuBurgerActiv ]);
    return(
        <div>
            <div className={mainContext.getSideMenuBurgerActiv ? 'menu_burger_wrapper active' : 'menu_burger_wrapper'} onClick={()=>{mainContext.setSideMenuBurgerActiv(false)}}>
                <div className={mainContext.getSideMenuBurgerActiv ? 'menu_burger_conteiner active': 'menu_burger_conteiner'}>
                    <div className="close_cross" onClick={()=>{mainContext.setSideMenuBurgerActiv(false)}}>
                        <span></span>
                    </div>
                    <div className="menu_burger_content">
                        <Link to={`placeList`} onClick={()=>{mainContext.setSideMenuBurgerActiv(false)}}>
                            <div><SideBarPlaceBtn/></div>
                        </Link>
                        <Link to={'products/'} onClick={()=>{mainContext.setSideMenuBurgerActiv(false)}}>
                            <div><SideBarProductBtn/></div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}