import React from "react";
import { useState } from "react";
import '../styles/main_title.scss'
import {ReactComponent as Logo} from "../svg/logo.svg";
import { useManeContext } from "./main_context";
import { Logout } from "../views/Auth/logout";


export function MainTitle(){
    let mainContext = useManeContext()



    function openBurger(){

        mainContext.setSideMenuBurgerActiv(!mainContext.getSideMenuBurgerActiv)
    }

    return(
        <div className="main_title_wrapper">
            <div className="main_title" >
                <div>
                    <div className={mainContext.getSideMenuBurgerActiv ? 'burger active': 'burger' } onClick={openBurger}>
                        <span> </span>
                    </div> 
                </div>

                <div className="svg_title_wrapper">
                    <Logo className="svg_title"/>
                </div>
                
                <div className="logout">
                        <Logout/>
                </div>    
            </div>            
        </div>    
    )
}