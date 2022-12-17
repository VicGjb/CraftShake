import React, {useEffect,useState} from "react";
import { NetworkManager} from "../../components/network_manager";
import {useParams} from 'react-router-dom';
import { useManeContext } from "../../components/main_context";
import { AddButton } from "../../components/buttons/add_button";
import { RegularButton } from "../../components/buttons/regular_button";
import { PopupAddMenu } from "../../components/popup/popup_add_menu";
import { MenuListTableHead } from "./MenuCardTableHead";
import { CurrentMenuChackBox } from "./menu_list_current_btn";
import { Link } from "react-router-dom";
import { MenuCard } from "./MenuCard";
import '../../styles/menu_list.scss'


export function MenuList(){
    let [menus, setMenus] = useState([]);
    let {placeId} = useParams();
    let {placeName} = useParams();
    let [add_menu_active, setAdd_menu_active] = useState(false);
    let network_manager = new NetworkManager();
    let main_context = useManeContext();

    useEffect(() => {
        network_manager.get_menus_list(placeId)
            .then((menus) => {
                setMenus(menus);
                console.log('Menus', menus);
        })},[placeId])
        
    function MenuListView(){
        return(
            <div className="menu_list_wrapper">
                <div className="service_button_row menu_list">
                    <div className="service_row_button_wrapper back" >
                        <Link to={`/${placeName}/${placeId}/detaile`}>
                            <RegularButton lable={'Back'}/>
                        </Link>
                    </div>
                    <div className="service_row_button_wrapper add" onClick={()=>[setAdd_menu_active(true)]}>
                        <AddButton  lable={'Add menu'} />   
                    </div>
                </div>
    
                <MenuListTableHead/>   
                {menus.map(menu =>(
                    <MenuCard menu={menu} key={menu.id}/>
                    
                ))}     
                
            <PopupAddMenu place_id={placeId} add_menu_active={add_menu_active} setAdd_menu_active={setAdd_menu_active}/>
            </div>
        
        )
    }

    return(
        MenuListView()
    )
}
