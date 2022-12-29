import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { NetworkManager } from "../components/network_manager";
import { Logout } from "../views/Auth/logout";
import { useManeContext } from "../components/main_context";

export function PersonalAccount(){
    let {userId} = useParams()
    let navigate = useNavigate()
    let main_context = useManeContext()    
    let user = main_context.getUserFromMainContext()

    useEffect(()=>{
            console.log('user on personal page',user)
            if (user.place){
                console.log('place',user.place)
            navigate(`${user.place}/main`)
                
            }
            // network_manager.get_place_detaile(user.place)
            //     .then(response =>{
            //         setPlace(response)
            //     })

        // console.log('ID',userId)
        // network_manager.GetUserData(userId)
        // .then(user=>{
        //     console.log('user',user)
        //     network_manager.get_place_detaile(user.place)
        //     .then(res_place=>{
        //         console.log('res_place',res_place)
        //         setPlace(res_place)
        //     })
        // })
    },[userId])
    function getUser(e){
        console.log(user)
    }

    return(
        <div>
            <div>Hello place </div>
            <button onClick={getUser}>GET USER</button>
            <Logout/>
        </div>
    )
}