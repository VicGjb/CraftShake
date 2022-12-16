import React, {useEffect,useState} from "react";
import { NetworkManager} from "../../components/network_manager";
import {useParams} from 'react-router-dom';
import { useManeContext } from "../../components/main_context";
import { AddButton } from "../../components/buttons/add_button";
import { RegularButton } from "../../components/buttons/regular_button";
import { PopupAddMenu } from "../../components/popup/popup_add_menu";
import { CurrentMenuChackBox } from "./menu_list_current_btn";
import { Link } from "react-router-dom";
import { MenuCard } from "./MenuCard";



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
            <div>
                <div className="menu_list_content">
                    <div className="menu_list_content_title regular_text">
                        Menus
                    </div>
                    <div className="menu_list_content_container">
                        {/* <div className="menu_list_button_set">
                            <div className="menu_list_button_set_add_button_wraper" onClick={main_context.goBack}>
                                <RegularButton lable={'Back'}/>
                            </div>
                            <div className="menu_list_button_set_add_button_wraper" onClick={()=>{setAdd_menu_active(true)}}>
                                <AddButton lable={'Add menu'}/>
                            </div>
                        </div> */}
                        <div className="menu_list_table regular_text_small">
                            <div className="menu_list_table_head">
                                <div className="menu_list_table_head_tr tr">
                                    <div className="th">ID:</div>
                                    <div className="th">Menu name:</div>
                                    <div className="th">Current:</div>
                                </div>
                            </div>
                            <div className="menu_list_table_body">
                                
                                    {menus.map(menu =>(
                                        // <Link to={`/${placeName}/${placeId}/menus/${menu.id}`} key={menu.id} className='td'>
                                            <MenuCard menu={menu}/>
                                        // </Link>
                                    ))}
                               
                            </div>
                        </div>
                    </div>
                </div>
                <PopupAddMenu place_id={placeId} add_menu_active={add_menu_active} setAdd_menu_active={setAdd_menu_active} />
            </div>
        )
    }

    return(
        <div>
            {MenuListView()}
        </div>
    )
}
