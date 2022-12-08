import React from "react";
import '../styles/place_subtitle.scss'

export const PlaceSubtitle=({place})=>{

    return(
        <div className="place_detaile_subtitle_wrap">
            <div className="place_detaile_subtitle_name" key={place.name}>
                <div className="place_detaile__name">
                    <p>{place.name}</p>
                </div>
            </div>
                
            <div className="place_detaile_subtitle_requisites">
                <div className="place_detaile_subtitle__requisites___slot">
                    <p>{place.address}</p>
                </div>
                <div className="place_detaile_subtitle__requisites___slot">
                    <p>{place.phone}</p>
                </div>
                <div className="place_detaile_subtitle__requisites___slot" >
                    <p>{place.email}</p>
                </div>
            </div>
        </div>
    )
}