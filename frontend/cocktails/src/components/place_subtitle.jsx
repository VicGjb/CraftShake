import React from "react";
import '../styles/place_subtitle.scss'

export const PlaceSubtitle=({place})=>{

    return(
        <div className="place_detaile_subtitle_wrap">
            <div className="place_detaile_subtitle__requisites___slot address">
                <div className="place-detaile-subtitle__addres">
                    <p>{place.address}</p>
                </div>
            </div>
            <div className="place_detaile_subtitle_name" key={place.name}>
                <div className="place_detaile__name">
                    <p>{place.name}</p>
                </div>
                <div className="place_detaile_subtitle__requisites___slot phone">
                    <p>{place.phone}</p>
                </div>
            </div>
            <div className="place_detaile_subtitle__requisites___slot email" >
                    <p className="email_row">{place.email}</p>
                    <p className="phone_row">{place.phone}</p>
            </div>
        </div>
        
    )
}