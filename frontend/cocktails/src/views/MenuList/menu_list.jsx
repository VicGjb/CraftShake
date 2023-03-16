import React, {useEffect,useState} from "react";
import { NetworkManager} from "../../api/network_manager";
import {useParams} from 'react-router-dom';
import { useMainContext } from "../../router/main_context";
import { AddButton } from "../../components/buttons/add_button";
import { RegularButton } from "../../components/buttons/regular_button";
import { PopupAddMenu } from "../../components/popup/popup_add_menu";
import { Link } from "react-router-dom";
import { MenuCard } from "./MenuCard";
import '../../styles/menu_list.scss'


export function MenuList(){
    let [menuList, setMenuList] = useState([]);
    let {placeId} = useParams();
    let {placeName} = useParams();
    let [add_menu_active, setAdd_menu_active] = useState(false);
    let network_manager = new NetworkManager();
    let mainContext = useMainContext();
    let user = mainContext.getUserFromMainContext()

    useEffect(() => {
        network_manager.get_menus_list(placeId)
            .then((menus) => {
                setMenuList(menus);
                //console.log('Menus', menus);
        })},[placeId])

    function renderAddMenuButton(){
        if(user.role=='counter'){
            return(
                <div className="service_row_button_wrapper add" onClick={()=>[setAdd_menu_active(true)]}>
                        <AddButton  lable={'Add menu'} />   
                    </div>
            )
        }
    }
        
    function MenuListView(){
        return(
            <div className="menu_list_wrapper">
                <div className="service_button_row menu_list">
                    <div className="service_row_button_wrapper back" >
                        <Link to={`/${placeName}/${placeId}/detaile`}>
                            <RegularButton lable={'Back'}/>
                        </Link>
                    </div>
                    {renderAddMenuButton()}
                </div>
    
                <div className="menu_list_cards">
                    {menuList.map(menu =>(
                        <MenuCard menu={menu} key={menu.id}/>
                        ))}
                </div>
                   
                
            <PopupAddMenu 
                place_id={placeId} 
                add_menu_active={add_menu_active} 
                setAdd_menu_active={setAdd_menu_active}
                setMenuList={setMenuList}
                />
            </div>
        
        )
    }

    return(
        MenuListView()
    )
}
