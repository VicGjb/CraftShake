import axios from "axios";
import { useState } from "react";

export function CurrentMenuChackBox({menu}){
    let [form, setForm] = useState(
        {
        is_current_menu: menu.is_current_menu,
        }
    )
 
    function setCurrent(e){
        setForm({...form, [e.target.name]:e.target.checked})
        axios
            .post(`http://127.0.0.1:8000/api/counter/menu/update/${menu.id}`, {'is_current_menu':e.target.checked})
            .then(response => {
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
                    onChange={setCurrent}
                    />
        </div>
        
    )
}