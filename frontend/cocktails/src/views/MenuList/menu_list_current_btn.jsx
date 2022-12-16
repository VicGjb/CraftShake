import React from "react";
import { NetworkManager } from "../../components/network_manager";
import { useState } from "react";
import { RegularButton } from "../../components/buttons/regular_button";

export function CurrentMenuChackBox({menu, form}){
    let network_manager = new NetworkManager()
    let [current, setCurrent] = useState(menu.is_current_menu)

    function renderMenuCurrentState(){
        if (current){
            console.log(menu)
            return(
                <div className="menu_card_slot current green" onClick={setNotCurent}>
                     <RegularButton lable={'Current'}/>
                </div>
            )
        }else{
            return(
                <div className="menu_card_slot current red" onClick={setCurent}>
                    <RegularButton lable={'Not current'}/>
                </div>
            )
        }
    }
    
    function setNotCurent(){
        setCurrent(false)
        network_manager.update_menu(menu.id,{["is_current_menu"]:false})
            .then(response=>{
                console.log(response);
                console.log('result',form);
                })
                .catch(error => {
                    console.log(error);
                    throw error;
                });     
    }
    function setCurent(){
        setCurrent(true)
        network_manager.update_menu(menu.id,{["is_current_menu"]:true})
            .then(response=>{
                console.log(response);
                console.log('result',form);
                })
                .catch(error => {
                    console.log(error);
                    throw error;
                });     
    }

    return(
        renderMenuCurrentState()
        
    )
}