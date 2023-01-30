import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useManeContext } from "../../components/main_context";
import { Loading } from "../../components/loader";
import { AuthServise } from "../Auth/auth_service";
import { NetworkManager } from "../../components/network_manager";

export function HomePage(){
    let mainContext = useManeContext()
    let navigate = useNavigate()
    let user = mainContext.getUserFromMainContext()

    useEffect(()=>{
        console.log('Hello im on the HomePage')
  
        if(!user){
            return navigate('/login')
        }else if(user.role === 'counter'){
            return navigate(`/placeList/`)
        }else if(user.role == 'customer'){
            return navigate(`/customer/${user.id}/`)
        }
        },[])

}