import React, {useEffect,useState} from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { PlaceSubtitle } from "../../components/place_subtitle";
import { useLocation } from "react-router-dom";
import { AddButton } from "../../components/buttons/add_button";
import { PopupAddMenu } from "../../components/popup/popup_add_menu";
import { CurrentMenuChackBox } from "./menu_list_current_btn";
import { Link } from "react-router-dom";


export function MenuList(){
    let [menus, setMenus] = useState([]);
    let {placeId} = useParams();
    let location = useLocation();
    let {from} = location.state;
    let place = from;
    let [add_menu_active, setAdd_menu_active] = useState(false)

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/counter/menu/?place=${place.id}`)
            .then((response) => {
                setMenus(response.data.results);
                console.log('Response', response.data.results);
        })},[placeId])
        
    function changeCurrent(e){
        console.log('Changed')
        e.preventDefault()
    }    

    function MenuListView(){
        return(
            <div>
                <div>
                    <PlaceSubtitle place={place}/>
                </div>
                <div className="menu_list_content">
                    <div className="menu_list_content_title regular_text">
                        Menus
                    </div>
                    <div className="menu_list_content_container">
                        <div className="menu_list_button_set">
                            <div className="menu_list_button_set_add_button_wraper" onClick={()=>{setAdd_menu_active(true)}}>
                                <AddButton lable={'Add menu'}/>
                            </div>
                        </div>
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
                                        <div className="menu_list_table_body_tr tr" key={menu.id}>
                                                <div className="td">
                                                <Link to={`/menus/${menu.id}`} key={menu.id} className='td' state={{from: place}}>
                                                    <p className="td">{menu.id} </p>
                                                </Link>   
                                                </div>
                                                <div className="td">
                                                <Link to={`/menus/${menu.id}`} key={menu.id} className="td" state={{from: place}}>
                                                    <p className="td">{menu.name} </p>
                                                </Link>    
                                                </div>
                                            <div className="td">
                                                <CurrentMenuChackBox menu={menu}/>
                                            </div>
                                        </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <PopupAddMenu place={place} add_menu_active={add_menu_active} setAdd_menu_active={setAdd_menu_active} />
            </div>
        )
    }

    return(
        <div>
            {
                MenuListView()
            }
        </div>
    )
}
