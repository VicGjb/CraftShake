import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useManeContext } from "../../components/main_context";
import '../../styles/menu_card.scss'
import { CurrentMenuChackBox } from "./menu_list_current_btn";

export function MenuCard({menu}){
    let {placeId} = useParams();
    let {placeName} = useParams();
    let mainContext = useManeContext()
    let user =  mainContext.getUserFromMainContext()

    function renderCurrentButton(){
        if(user.role==='counter'){
            return(
                <CurrentMenuChackBox menu={menu}/>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }

    if (user.role==='counter'){
        return(
            <div className="menu_card_wrapper">
                <Link to={`/${placeName}/${placeId}/menus/${menu.id}`} className='link_to_menu_detile'></Link>
                <div className="menu_card_slot id">#{menu.id}</div>
                <div></div>
                <div className="menu_card_slot name">{menu.name}</div>
                {renderCurrentButton()}
            </div>
        )
    }else{
        if (menu.is_current_menu){
            return(
                <div className="menu_card_wrapper">
                <Link to={`/${placeName}/${placeId}/menus/${menu.id}`} className='link_to_menu_detile'></Link>
                <div className="menu_card_slot id">#{menu.id}</div>
                <div></div>
                <div className="menu_card_slot name">{menu.name}</div>
                {renderCurrentButton()}
            </div>
            )
        }
    }
    
}