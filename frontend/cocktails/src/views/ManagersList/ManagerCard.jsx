import React, { useState } from "react";
import { RegularButton } from "../../components/buttons/regular_button";
import { PopupManagerCard } from "./PopupManagerCard";
import { PopupDelete } from "../../components/popup/popup_delete";
import { NetworkManager } from "../../components/network_manager";
import { useManagersContext } from "./ManagersContext";
import { PopupAddManager } from "../../components/popup/popup_add_manager";
import '../../styles/manager_card.scss'

export function ManagerCard({manager}){
    let [subMenu, setSubMenu] = useState(false)
    let [delete_active, setDelete_active] = useState(false)
    let [managerCardPopupActive, setManagerCardPopupActive] = useState(false)
    let networkManager = new NetworkManager()
    let managersContext = useManagersContext()

    let [add_manager_active, setAdd_manager_active] = useState(false)

    function DeleteManager(){
        networkManager.delete_manager(manager.id)
            .then(response =>{
                managersContext.setManagersList(response)
                //console.log('manager deleted',response);
            })
            .catch(error=>{
                //console.log(error);
                throw error;
            });
            setDelete_active(false)
        }

    return(
        <div>
            <div className="manager_card_wrapper">
            <div className="open_menu_position_card_popup" onClick={()=>{setManagerCardPopupActive(true)}}></div>
                <div className="menu_position_card_service_menu"  onClick={()=>{setSubMenu(true)}}>
                    <div className="service_menu_dot"></div>
                    <div className="service_menu_dot"></div>
                    <div className="service_menu_dot"></div>
                </div>

                <div className="manager_card_title">
                    <div className="manager_card_name">
                        {manager.name}
                    </div>
                    <div className="manager_card_phone">
                        <span>{manager.phone}</span> 
                    </div>
                </div>
                
                <div className={manager.description?'manager_card_description active':"manager_card_description"}>
                    Note:<br/>
                    <div className="manager-description-wrapper">{manager.description}</div>
                </div>

                <div className={subMenu?'sub_menu_wrapper active':"sub_menu_wrapper"} onClick={()=>{setSubMenu(false)}}>
                    <div className="sub_menu_content">
                    <div className="menu_position_card_slot update" onClick={()=>{setAdd_manager_active(true)}}>
                            <RegularButton lable={'Update'}/>
                        </div>
                        <div className="menu_position_card_slot delete" onClick={()=>{setDelete_active(true)}}>
                            <RegularButton lable={'Delete'}/>
                        </div>
                        
                    </div>
                </div>
                
                <PopupAddManager 
                    add_manager_active={add_manager_active} 
                    setAdd_manager_active={setAdd_manager_active} 
                    manager={manager}
                    />
                {/* <PopupUpdateManager
                manager={manager}
                updateManagerActive={updateManagerActive}
                setUpdateManagerActive={setUpdateManagerActive}
                /> */}

                <PopupDelete 
                subject={manager.name}
                delete_active={delete_active}
                setDelete_active={setDelete_active}
                func={DeleteManager}
                />     
            </div>
            <PopupManagerCard 
                managerCardPopupActive={managerCardPopupActive}
                setManagerCardPopupActive={setManagerCardPopupActive}
                manager={manager} 
            />
        </div>
    )
}