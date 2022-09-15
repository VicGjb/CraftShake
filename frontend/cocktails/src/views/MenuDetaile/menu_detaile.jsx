import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PlaceSubtitle } from "../../components/place_subtitle";
import { RegularButton } from "../../components/buttons/regular_button";
import { AddButton } from "../../components/buttons/add_button";
import { ReactComponent as CrossDel } from "../../svg/cross_del.svg";
import { AddMenuPosition } from "../AddMenuPosition/add_menu_position";
import { MenuDetailePositionRow } from "./menu_detaile_position_row";
import { PopupAddMenuPosition } from "../../components/popup/popup_add_menu_position";
import { Link } from "react-router-dom";
import axios from "axios";

export function MenuDetaile(){
    let location=useLocation();
    let {from}=location.state;
    let place = from;

    let [menu, setMenu] = useState({});
    let [loaded, setLoaded] = useState(false);
    let {menuId} = useParams();

    let [add_menu_position_active, setAdd_menu_position_active] = useState(false)

    useEffect(() => {
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/counter/menu/${menuId}/`
        }).then(response => {
            setMenu(response.data);
            setLoaded(true);
        })
    },[menuId])

    function DeleteMenu(){
        axios
            .post(`http://127.0.0.1:8000/api/counter/menu/delete/${menu.id}/`)
            .then(response =>{
                console.log('Menu was deleted', response);
            })
            .catch(error=>{
                console.log(error);
                throw error;
            });
    }
    function DeletePosition(){
        console.log('Rew')
    }

    function MenuView(){
        return(
            <div>
                <div>
                    <PlaceSubtitle place={place}/>
                </div>
                <div className="menu_detaile_content">
                    <div className="menu_detaile_content_title regular_text_small">
                        <div className="menu_detaile_content_title_id">
                            Menu: #{menu.id}
                        </div>
                        <div className="menu_detaile_content_title_name">
                            {menu.name}
                        </div>
                    </div>
                    <div className="menu_detaile_content_button_set">
                        <div className="menu_detaile_content_button_set_delete_btn" onClick={DeleteMenu}>
                            <Link to={{pathname: `/${place.id}/${place.name}/menus`,}} replace state={{from: place}}>
                                <RegularButton lable={'Delete'}/>
                            </Link>
                        </div>
                        <div className="menu_detaile_content_button_set_add_btn" onClick={()=>setAdd_menu_position_active(true)}>
                            <AddButton lable={'Add position'}/>
                        </div>
                    </div>

                    <div className="menu_detaile_content_body">
                        <div className="menu_detaile_content_body_table">
                            <div className="menu_detaile_content_body_table_head">
                                <div className="menu_detaile_content_body_table_head_tr tr regular_text">
                                    <div className="th">Name</div>
                                    <div className="th">Photo</div>
                                    <div className="th">Description</div>
                                    <div className="th">Price</div>
                                    <div className="th"></div>
                                </div>
                            </div>
                            <div className="menu_detaile_content_body_table_boby">
                                {menu.position_in_menu.map(position=>(
                                   <div key={position.id}>
                                       <MenuDetailePositionRow position={position}/>
                                   </div> 
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <PopupAddMenuPosition add_menu_position_active={add_menu_position_active} setAdd_menu_position_active={setAdd_menu_position_active} menu={menu}/>
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
        <div>
          {Render(loaded)}  
        </div>
    )
}