import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import '../../styles/menu_card.scss'
import { CurrentMenuChackBox } from "./menu_list_current_btn";

export function MenuCard({menu}){

    return(
        <div className="menu_card_wrapper">
            <div className="menu_card_slot id">#{menu.id}</div>
            <div className="menu_card_slot name">{menu.name}</div>
            <CurrentMenuChackBox menu={menu}/>
        </div>
    )

}