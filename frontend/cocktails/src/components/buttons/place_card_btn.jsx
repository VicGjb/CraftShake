import React, {Component, useEffect, useState} from "react";
import { Link } from "react-router-dom";

export const PlaceCardBtn=({p})=>{

    return(
        <button className="place_card_btn" value={p.id}>
            <Link to={`/${p.name}/${p.id}/detaile`} className="place_card_btn_wrapper">
                <div className="place_card_dtn_title">{p.name}</div>
                <div className="place_card_btn_subtitle">{p.address}</div>
                <div className="place_card_btn_subtitle">{p.phone}</div>
            </Link>
        </button>
    )
}

