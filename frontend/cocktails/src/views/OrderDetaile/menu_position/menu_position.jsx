import React, { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { MenuPositionRow } from "./menu_position_row";
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context";
import { useParams } from "react-router-dom";


export function MenuPositions(props){
    let [menu_positions, setMenu_positions] = useState({});
    let [loaded, setLoaded] = useState(false);
    let {menuId} = useParams([]);

    useEffect(()=>{
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/api/counter/menu-position/?menu=${menuId}`
        }).then(response =>{
            setMenu_positions(response.data.results);
            setLoaded(true);
        })
    },[menuId])


    function MenuPositionView(){
        return(
            <div>
                {menu_positions.map(position =>(
                    <MenuPositionRow position={position} order={props.order} key={position.id}/>
                ))}
            </div>
        )
    }

    function Render(loaded){
        if(loaded){
            return MenuPositionView()
        }else{
            return(
                <div>Lodaded</div>
            )
        }
    }

    return(
        <div>
            {Render(loaded)}             
        </div>
    )
}