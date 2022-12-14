import React from "react";
import { useState, useEffect } from "react";
import { NetworkManager } from "../../../components/network_manager";
import { MenuPositionRow } from "./menu_position_row";
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context";
import { useParams } from "react-router-dom";


export function MenuPositions(){
    let [menu_positions, setMenu_positions] = useState({});
    let [loaded, setLoaded] = useState(false);
    let {menuId} = useParams([]);
    let network_manager = new NetworkManager()

    useEffect(()=>{
        network_manager.get_menu_positions_list(menuId)
            .then(menu_positions =>{
                setMenu_positions(menu_positions);
                setLoaded(true);
            })
    },[menuId])

    function MenuPositionView(){
        return(
            menu_positions.map(position =>(
                <MenuPositionRow 
                    key={position.id} 
                    position={position}  
                    />
            ))
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
            Render(loaded)            
    )
}