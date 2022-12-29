import React, { useState } from "react";
import { useManeContext } from "../../components/main_context";
import { RegularButton } from "../../components/buttons/regular_button";
import { PopupDelete } from "../../components/popup/popup_delete";
import { NetworkManager } from "../../components/network_manager";
import { useMenuDetaileContext } from "./MenuDetaileContext";
import { PopupMenuPositionCard } from "./PopupMenuPositionCard";
import '../../styles/menu_position_card.scss'

export function MenuPositionCard({menuPosition}){
    let mainContext = useManeContext()
    let user = mainContext.getUserFromMainContext()
    let [subMenu, setSubMenu] = useState(false)
    let [delete_active, setDelete_active] = useState(false)
    let [menuPositionCardPopupActive,setMenuPositionCardPopupActiv] = useState(false)
    let networkManager = new NetworkManager()
    let menuDetaileContext = useMenuDetaileContext()

    function DeletePosition(){
        networkManager.delete_menu_position(menuPosition.id)
            .then(responce =>{
                console.log(responce);
            })
            .catch(error => {
                console.log(error);
                throw error;
            })
            menuDetaileContext.removeMenuPosition(menuPosition);
            setDelete_active(false)
    }
    function renderSubMenu(){
        if(user.role_name==='counter'){
            return(
                <div className="menu_position_card_service_menu"  onClick={()=>{setSubMenu(true)}}>
                    <div className="service_menu_dot"></div>
                    <div className="service_menu_dot"></div>
                    <div className="service_menu_dot"></div>
                </div>
            )
        }
    }

    return(
        <div>
            <div className="menu_position_card_wrapper">
                <div className="open_menu_position_card_popup" onClick={()=>{setMenuPositionCardPopupActiv(true)}}></div>
                {renderSubMenu()}
                <div className="menu_position_card_top_conteiner">
                    <div className="menu_position_card_slot photo">
                        <img src={mainContext.getPhoto(menuPosition.photo)} alt=""/> 
                    </div>
                    <div className="menu_position_card_title_description_conteiner">
                        <div className="menu_position_card_slot name">{menuPosition.name} </div>
                        <div className="menu_position_card_slot description">{menuPosition.description} </div>
                    </div>   
                </div>
                <div className="menu_position_card_volume_price">
                    <div className="menu_position_card_slot volume">Volume: {Number(menuPosition.volume).toFixed(0)} ml </div>
                    <div className="menu_position_card_slot price">Price: {menuPosition.sale_price} </div>
                </div>
                <div className={subMenu?'sub_menu_wrapper active':"sub_menu_wrapper"} onClick={()=>{setSubMenu(false)}}>
                    <div className="sub_menu_content">
                        <div className="menu_position_card_slot delete" onClick={()=>{setDelete_active(true)}}>
                            <RegularButton lable={'Delete'}/>
                        </div>
                    </div>
                </div>
            </div>
            <PopupDelete 
                subject={menuPosition.name}
                delete_active={delete_active}
                setDelete_active={setDelete_active}
                func={DeletePosition}
            /> 
            <PopupMenuPositionCard
                menuPositionCardPopupActive = {menuPositionCardPopupActive}
                setMenuPositionCardPopupActiv = {setMenuPositionCardPopupActiv}
                menuPosition = {menuPosition}
            />
        </div>
    )
}