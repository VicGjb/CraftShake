import React from "react";
import axios from "axios";
import { ReactComponent as CrossDel } from "../../svg/cross_del.svg";

export function MenuDetailePositionRow({position}){
    

    function DeletePosition(){
        axios
            .post (`http://127.0.0.1:8000/api/counter/menu-position/delete/${position.id}/`)
            .then(responce =>{
                console.log(responce);
            })
            .catch(error => {
                console.log(error);
                throw error;
            })
            window.location.reload();
    }
    return(
        <div className="menu_detaile_content_body_table_body_tr tr regular_text_small" key={position.id}>
            <div className="td">{position.name}</div>
            <div className="td">
                <div className="position_photo">
                    <img src={position.photo} alt="" />  
                </div>    
            </div>
            <div className="td">{position.discription}</div>
            <div className="td">{position.sale_price}</div>
            <div className="td">
                <button className="cross_del_btn" onClick={DeletePosition}>
                <CrossDel className='icon_cross_del_btn'/>    
                </button>
            </div>
        </div>
    )
}