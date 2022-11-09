import React from "react";
import { NetworkManager } from "../../components/network_manager";
import { useState } from "react";

export function CurrentMenuChackBox({menu}){
    let network_manager = new NetworkManager()
    let [form, setForm] = useState(
        {
        is_current_menu: menu.is_current_menu,
        }
    )
    
    async function updateMenu(e){
        setForm({...form, ["is_current_menu"]:e.target.checked})
        network_manager.update_menu(menu.id,{["is_current_menu"]:e.target.checked})
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
        <div>
            <input 
                type="checkbox"
                name="is_current_menu"
                checked={form.is_current_menu}
                onChange={updateMenu}
                />
        </div>
        
    )
}