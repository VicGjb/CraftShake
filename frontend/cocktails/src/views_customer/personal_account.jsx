import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { NetworkManager } from "../components/network_manager";

export function PersonalAccount(){
    let network_manager = new NetworkManager()
    let [place, setPlace] = useState({})
    let {userId} = useParams()

    useEffect(()=>{
        console.log('ID',userId)
        network_manager.GetUserData(userId)
        .then(user=>{
            console.log('user',user)
            network_manager.get_place_detaile(user.place)
            .then(res_place=>{
                console.log('res_place',res_place)
                setPlace(res_place)
            })
        })
    },[userId])

    return(
        <div>
            <div>Hello place {place.name}</div>
        </div>
    )
}