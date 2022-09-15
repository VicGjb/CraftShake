import axios from "axios";
import React from "react";
import { ReactComponent as CrossDel } from "../../svg/cross_del.svg";

export function ManagersListRow({manager}){
    
    function DeleteManager(){
        axios
            .post(`http://127.0.0.1:8000/api/counter/manager/delete/${manager.id}`)
            .then(response =>{
                console.log('manager deleted',response);
            })
            .catch(error=>{
                console.log(error);
                throw error;
            });
        window.location.reload()
        }

    return(
        <div className="manager_list_table_body_tr tr" key={manager.id}>
            <div className="td">{manager.name}</div>
            <div className="td">{manager.phone}</div>
            <div className="td">{manager.description}</div>
            <div className="td del_button">
                <button className="cross_del_btn" onClick={DeleteManager}>
                    <CrossDel className='icon_cross_del_btn'/>    
                </button>
            </div>
        </div>
)
}