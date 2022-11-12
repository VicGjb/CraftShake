import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {AuthServise} from "../views/Auth/auth_service"

    let auth_servise = new AuthServise()

    let isLoggedIn = auth_servise.CheckAuth()

export function AuthLayout(){

    if (isLoggedIn){
        return <Outlet/>
    } else {
        return <Navigate replace to ={'/login/'}/>
    }
}