import React from "react";
import { AddButton } from "../../components/buttons/add_button";
import { Link, useParams } from "react-router-dom";
import { RegularButton } from "../../components/buttons/regular_button";

export function ManagerListButtonRow({setAdd_manager_active}){
    let {placeId} = useParams()
    let {placeName} = useParams()
    return(
        <div className="service_button_row menu_list">
            <div className="service_row_button_wrapper back" >
                <Link to={`/${placeName}/${placeId}/detaile`}>
                    <RegularButton lable={'Back'}/>
                </Link>
            </div>
            <div className="service_row_button_wrapper add" onClick={()=>[setAdd_manager_active(true)]}>
                <AddButton  lable={'Add manager'} />   
            </div>
        </div>
    )
}