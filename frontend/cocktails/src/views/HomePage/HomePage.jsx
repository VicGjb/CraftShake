import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMainContext } from "../../router/main_context";
import { Loading } from "../../components/loader";
import { AuthServise } from "../Auth/auth_service";
import { NetworkManager } from "../../api/network_manager";

export function HomePage(){
    let mainContext = useMainContext()
    let navigate = useNavigate()
    let user = mainContext.getUserFromMainContext()

    useEffect(()=>{
        //console.log('Hello im on the HomePage')
  
        if(!user){
            return navigate('/login')
        }else if(user.role === 'counter'){
            return navigate(`/placeList/`)
        }else if(user.role == 'customer'){
            return navigate(`/customer/${user.id}/`)
        }
        },[])

}