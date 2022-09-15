import React from "react";

export const PlaceSubtitle=({place})=>{

    return(
        <div className="place_detaile_subtitle_wrap">
            <div className="place_detaile_subtitle_name" key={place.name}>
                <div className="place_detaile__name">
                    <p>{place.name}</p>
                </div>
            </div>
                
            <div className="place_detaile_subtitle_requisites">
                <div className="place_detaile__address">
                    <p>{place.address}</p>
                </div>
                <div className="place_detaile__phone">
                    <p>Phone: {place.phone}</p>
                </div>
                <div className="place_detail__email" >
                    <p>{place.email}</p>
                </div>
            </div>
        </div>
    )
}