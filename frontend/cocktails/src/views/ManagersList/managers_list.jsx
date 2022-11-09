import React, {useEffect,useState} from "react";
import { NetworkManager } from "../../components/network_manager";
import {useParams} from 'react-router-dom';
import { useManeContext } from "../../components/main_context";
import { AddButton } from "../../components/buttons/add_button";
import { RegularButton } from "../../components/buttons/regular_button";
import { ManagersListRow } from "./managers_list_row";
import { PopupAddManager } from "../../components/popup/popup_add_manager";

export function ManagersList(){
    let [managers, setManagers] = useState([]);
    let [is_loaded, setLoaded] = useState(false)
    let {placeId} = useParams();
    let {placeName} = useParams();
    let main_context = useManeContext();
    let network_manager = new NetworkManager()
    let [add_manager_active, setAdd_manager_active] = useState(false)


    useEffect(() => {
        network_manager.get_managers_list(placeId)
        .then(managers => {
            setManagers(managers)
            setLoaded(true)
        })
    },[placeId])


    function ManagerListView(){
        return(
        <div>
            <div className="managers_list_content">
                <div className="managers_list_cintetn__title regular_text">
                    Managers of {placeName}
                </div>
            </div>
            <div className="managers_list_content__conteiner">
                <div className="managers_list_content__conteiner___button_set">
                    <div onClick={main_context.goBack}>
                        <RegularButton lable={'Back'}/>  
                    </div>
                    <div onClick={()=>setAdd_manager_active(true)}>
                        <AddButton lable={'Add manager'}/>  
                    </div>
                </div>
                <div className="managers_list_content__conteiner___table regular_text_small">
                    <div className="manager_list_table_head">
                        <div className="managers_list_table_head_tr tr">
                            <div className="th">Name</div>
                            <div className="th">Phone</div>
                            <div className="th">Description</div>
                            <div className="th"></div>
                        </div>
                    </div>
                    <div className="managers_list_table_body">
                        {managers.map(manager=>(
                            <div key={manager.id}>
                                <ManagersListRow manager={manager}/>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <PopupAddManager add_manager_active={add_manager_active} setAdd_manager_active={setAdd_manager_active}/>
        </div>
        )
    }

    function Render(is_loaded){
        if(is_loaded){
            return(ManagerListView())
        }else{
            return(
                <div>Loaded</div>
            )
        }
    }

    return(
        <div>
            {Render(is_loaded)}   
        </div> 
    )
}


