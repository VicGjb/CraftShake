import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { PlaceSubtitle } from "./place_subtitle";
import { NetworkManager } from "./network_manager";
import '../styles/layout_place.scss'
export function LayoutPlace(){
    let {placeId} = useParams()
    let [place, setPlace] = useState()
    let [loaded, setLoaded] = useState()
    let network_manager = new NetworkManager()
    
    useEffect(() => {
        network_manager.get_place_detaile(placeId)
            .then(place => { 
                setPlace(place);
                setLoaded(true);
        })
    }, [placeId])


    function LayoutPlaceView(){
        return(
            <div className="place_detaile_wrapper">
                <PlaceSubtitle place={place}/>
                <Outlet></Outlet>
            </div>
        )
    }

    function Render(is_loaded){
        if (is_loaded){
            return LayoutPlaceView()
        } else{
            return(
                <div>Loading</div>
            )
        }
    }

    return(
        <div>
            {Render(loaded)}
        </div>
    )
}