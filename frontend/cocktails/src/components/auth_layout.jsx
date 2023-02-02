import React from "react";
import {Outlet } from "react-router-dom";
import {AuthServise} from "../views/Auth/auth_service"
import {useManeContext} from "../components/main_context"
import { useEffect } from "react";


export function AuthLayout(){
    let auth_servise = new AuthServise()
    let isLoggedIn = auth_servise.CheckAuth()
    let mainContext = useManeContext()
   
    useEffect(()=>{
        //console.log('HEYYY')
    })

    if (isLoggedIn){
        return <Outlet/>
    }else{
        //console.log('hey')
    }
}