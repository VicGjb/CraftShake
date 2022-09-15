import React from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "./side_bar/side_bar";
import { MainTitle } from "./main_title";


export const Layout = () =>{
    return(
        <div className='wrapper'>
                <SideBar/> 
            <div className='content'>
                <MainTitle/>
                <div className='work_space'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>   
 
    )
}