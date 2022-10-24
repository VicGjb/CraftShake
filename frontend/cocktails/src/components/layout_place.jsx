import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { PlaceSubtitle } from "./place_subtitle";
import { axiosInstance } from "./axios";

export function LayoutPlace(){
    let {placeId} = useParams()
    let [place, setPlace] = useState()
    let [loaded, setLoaded] = useState()
    
    useEffect(() => {
        axiosInstance({
          method: 'GET',
          url: `counter/place/${placeId}`
            }).then(response => { 
                setPlace(response.data);
                setLoaded(true);
        })
    }, [placeId])


    function LayoutPlaceView(){
        return(
            <div>
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