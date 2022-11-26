import React, { useEffect } from "react";
import { NetworkManager } from "../../components/network_manager";
import { ReactComponent as CrossDel } from "../../svg/cross_del.svg";
import { useManeContext } from "../../components/main_context";

export function MenuDetailePositionRow({position}){
    let mainContext = useManeContext()
    let network_manager = new NetworkManager()

    useEffect(()=>{
        console.log('Menu Position Row Photo', position.photo)
    })

    function DeletePosition(){
        network_manager.delete_menu_position(position.id)
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
                    <img src={mainContext.getPhoto(position.photo)} alt="" />  
                </div>    
            </div>
            <div className="td">{position.discription}</div>
            <div className="td">{Number(position.volume).toFixed(0)} ml</div>
            <div className="td">{position.sale_price}</div>
            <div className="td">
                <button className="cross_del_btn" onClick={DeletePosition}>
                <CrossDel className='icon_cross_del_btn'/>    
                </button>
            </div>
        </div>
    )
}