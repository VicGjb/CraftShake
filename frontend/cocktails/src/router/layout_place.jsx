import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { PlaceSubtitle } from "../components/place_subtitle";
import { NetworkManager } from "../api/network_manager";
import { useMainContext } from "./main_context";
import { Loading } from "../components/loader";
import '../styles/layout_place.scss'

export function LayoutPlace(){
    let {placeId} = useParams()
    let [loaded, setLoaded] = useState()
    let network_manager = new NetworkManager()
    let mainContext = useMainContext()

    useEffect(() => {
        network_manager.get_place_detaile(placeId)
            .then(place => { 
                mainContext.setPlace(place)
                setLoaded(true);
        })
    }, [placeId])


    function LayoutPlaceView(){
        return(
            <div className="place_detaile_wrapper">
                <PlaceSubtitle place={mainContext.getPlace}/>
                <Outlet></Outlet>
            </div>
        )
    }

    function Render(is_loaded){
        if (is_loaded){
            return LayoutPlaceView()
        } else{
            return(
                <Loading/>
            )
        }
    }

    return(
            Render(loaded)
    )
}