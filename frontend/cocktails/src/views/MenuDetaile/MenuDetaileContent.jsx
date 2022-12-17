import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useManeContext } from "../../components/main_context";
import { RegularButton } from "../../components/buttons/regular_button";
import { AddButton } from "../../components/buttons/add_button";
import { MenuDetailePositionRow } from "./menu_detaile_position_row";
import { PopupAddMenuPosition } from "../../components/popup/popup_add_menu_position";
import { PopupDelete } from "../../components/popup/popup_delete";
import { NetworkManager } from "../../components/network_manager";
import { MenuDetaileButtonRow } from "./MenuDetaileButtonRow";
import { useMenuDetaileContext } from "./MenuDetaileContext";
import { MenuPositionCard } from "./MenuPositionCard";
import '../../styles/menu_detaile.scss'

export function MenuDetaileContent(){
    let {placeName} = useParams();
    let {placeId} = useParams();
    let main_context = useManeContext();
    let [menu, setMenu] = useState({});
    let [loaded, setLoaded] = useState(false);
    let {menuId} = useParams();
    let navigate = useNavigate();
    let network_manager = new NetworkManager()
    let menuDetaileContext = useMenuDetaileContext()

    let [add_menu_position_active, setAdd_menu_position_active] = useState(false)
    let [delete_active,setDelete_active] = useState(false)

    useEffect(() => {
        network_manager.get_menu_detaile(menuId)
            .then(menu => {
                setMenu(menu);
                menuDetaileContext.setMenu(menu)
                menuDetaileContext.setMenuPositions(menu.position_in_menu)
                setLoaded(true);
            })
    },[menuId])

    function DeleteMenu(){
        network_manager.delete_menu(menu.id)
            .then(response =>{
                console.log('Menu was deleted', response);
                navigate(`/${placeName}/${placeId}/menus`, {replace:false})
            })
            .catch(error=>{
                console.log(error);
                throw error;
            });
            
    }

    function MenuView(){
        return(
            <div className="menu_detaile_wrapper">
                <div className="invoice_detaile_title">
                    <div className="invoice_detaile_content_date">
                        {menu.name}
                    </div>
                </div>
                <MenuDetaileButtonRow/>      
                <div className="menu_detaile_menu_positions">
                    {menuDetaileContext.getMenuPositions.map(position=>(
                        <MenuPositionCard menuPosition={position} key={position.id}/>
                    ))}
                </div>
                <PopupAddMenuPosition add_menu_position_active={add_menu_position_active} setAdd_menu_position_active={setAdd_menu_position_active} menu={menu}/>
                <PopupDelete subject={`menu ${menu.name}`} delete_active={delete_active} setDelete_active={setDelete_active} func={DeleteMenu}/>
            </div>
        )
    }
    
    
    function Render(props){
        let isLoaded = props;
        if(isLoaded){
            return MenuView()
        }else{
            return(
                <div>Loading</div>
            )
        }
    }
    

    return(
        Render(loaded)
    )
}