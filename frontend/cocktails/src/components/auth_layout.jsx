import React from "react";
import { CheckAuth } from "./auth_service";
import { Navigate, Outlet } from "react-router-dom";

    let isLoggedIn = CheckAuth()

export function AuthLayout(){

    if (isLoggedIn){
        return <Outlet/>
    } else {
        return <Navigate replace to ={'/login/'}/>
    }
}