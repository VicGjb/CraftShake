import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { NetworkManager } from "../../components/network_manager";
import { PopupDelete } from "../../components/popup/popup_delete";
import { PopupAddMenuPosition } from "../../components/popup/popup_add_menu_position";
import { RegularButton } from "../../components/buttons/regular_button";
import { useNavigate } from "react-router-dom";
import { AddButton } from "../../components/buttons/add_button";
import { useMenuDetaileContext } from "./MenuDetaileContext";
import { useManeContext } from "../../components/main_context";
import '../../styles/menu_detaile_button_row.scss'

export function MenuDetaileButtonRow(){
    let {placeName} = useParams();
    let {placeId} = useParams();
    return(
        <div className="menu_detaile_button_row">
            <div className="menu_detaile_button_back">
                <Link to={`/${placeName}/${placeId}/menus`}>
                    <RegularButton lable={'Back'}/>
                </Link>
            </div>
            <DeleteMenuButton/>
            <AddMenuPosition/>
        </div>
    )
}

export function DeleteMenuButton(){
    let networkManager = new NetworkManager()
    let mainContext = useManeContext()
    let user = mainContext.getUserFromMainContext()
    let {placeName} = useParams();
    let {placeId} = useParams();
    let navigate = useNavigate()
    let [delete_active,setDelete_active] = useState(false)
    let menuDetaileContext = useMenuDetaileContext()
    let menu = menuDetaileContext.getMenu

    function deleteMenu(){
        networkManager.delete_menu(menu.id)
            .then(response =>{
                //console.log('Menu was deleted', response);
                navigate(`/${placeName}/${placeId}/menus`, {replace:false})
            })
            .catch(error=>{
                //console.log(error);
                throw error;
            });    
    }
    if(user.role==='counter'){
        return(
            <div className="delete_menu_button_wrapper">
                <div className="delete_menu_button" onClick={()=>{setDelete_active(true)}}>
                    <RegularButton lable={'Delete'}/>
                </div>
                <PopupDelete 
                    subject={`Menu ${menu.name}`} 
                    delete_active={delete_active} 
                    setDelete_active={setDelete_active} 
                    func={deleteMenu}/>
            </div>
        )
    }
}


export function AddMenuPosition(){
    let [add_menu_position_active, setAdd_menu_position_active] = useState(false)   
    let mainContext = useManeContext()
    let user = mainContext.getUserFromMainContext()

    if(user.role==='counter'){
        return(
            <div>
                <div className="menu_detaile_add_position_button" onClick={()=>setAdd_menu_position_active(true)}>
                <   AddButton lable={'Add position'}/>
                </div>
                <PopupAddMenuPosition add_menu_position_active={add_menu_position_active} setAdd_menu_position_active={setAdd_menu_position_active}/>
            </div>
            
        )
    }
    
}