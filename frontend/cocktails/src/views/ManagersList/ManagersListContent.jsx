import React, {useEffect,useState} from "react";
import { NetworkManager } from "../../api/network_manager";
import {useParams} from 'react-router-dom';
import { useMainContext } from "../../router/main_context";
import { PopupAddManager } from "../../components/popup/popup_add_manager";
import { ManagerCard } from "./ManagerCard";
import { ManagerListButtonRow } from "./ManagerListButtonRow";
import { useManagersContext } from "./ManagersContext";
import { PopupManagerCard } from "./PopupManagerCard";
import { Loading } from "../../components/loader";
import '../../styles/managers_list.scss'

export function ManagersListContent(){
    let [is_loaded, setLoaded] = useState(false)
    let {placeId} = useParams();
    let {placeName} = useParams();
    let main_context = useMainContext();
    let network_manager = new NetworkManager()
    let managersContext = useManagersContext()
    let managers = managersContext.getManagersList
    let [add_manager_active, setAdd_manager_active] = useState(false)


    useEffect(() => {
        network_manager.get_managers_list(placeId)
        .then(managers => {
            managersContext.setManagersList(managers)
            setLoaded(true)
        })
    },[placeId])


    function ManagerListView(){
        return(
            <div className="managers_list_content">
                <ManagerListButtonRow setAdd_manager_active={setAdd_manager_active} />
                <div className="menu_detaile_menu_positions">
                        {managers.map(manager=>(
                        <ManagerCard manager={manager} key={manager.id}/>
                        ))}  
                </div>
                <PopupAddManager add_manager_active={add_manager_active} setAdd_manager_active={setAdd_manager_active} />
            </div>
        )
    }

    function Render(is_loaded){
        if(is_loaded){
            return(ManagerListView())
        }else{
            return(
                <Loading/>
            )
        }
    }

    return(
        
        Render(is_loaded)
        
    )
}


