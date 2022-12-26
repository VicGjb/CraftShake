import React, {useEffect,useState} from "react";
import {useParams} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { NetworkManager } from "../../components/network_manager";
import { InvoicesMainBtn } from "../../components/buttons/invoices_main_btn";
import { OrdersMainBtn } from "../../components/buttons/orders_main_btn";
import { MenusMainBtn } from "../../components/buttons/menus_main_btn";
import { ManagersMainBtn } from "../../components/buttons/managers_main_btn";
import { AddButton } from "../../components/buttons/add_button";
import { PopupAddMenu } from "../../components/popup/popup_add_menu";
import { PopupAddInvoice } from "../../components/popup/popup_add_invoice";
import { PopupAddManager } from "../../components/popup/popup_add_manager";
// import { PopupChangePlace } from "../../components/popup/popup_change_place";
import { PopupAddPlace } from "../../components/popup/popup_add_place";
import { PopupDelete } from "../../components/popup/popup_delete";
import { RegularButton } from "../../components/buttons/regular_button";

import '../../styles/place_detaile.scss'

export function PlaceDetaile(){
    let [place, setPlace] = useState({});
    let {placeId} = useParams();
    let {placeName} = useParams();
    let [loaded, setLoaded] = useState(false);
    let network_manager = new NetworkManager()
    let [add_invoice_active, setAdd_invoce_active] = useState(false)
    let [add_menu_active, setAdd_menu_active] = useState(false)
    let [add_manager_active, setAdd_manager_active] = useState(false)
    let [add_place_active, setAdd_place_active] = useState(false)
    let [delete_active,setDelete_active] = useState(false)
    let navigate = useNavigate();
 
    useEffect(() => {
        network_manager.get_place_detaile(placeId)
        .then(place_detaile => {  
                setPlace(place_detaile);
                setLoaded(true);
        })
    }, [placeId])

    function DeletePlace(){
        network_manager.delete_place(placeId)
        .then(response=>(
            console.log('Place deleted'),
            navigate(`/placeList` ,{replace:false})
        ))
        .catch(error=>{
            console.log(error);
            throw error;
        });
    }

    function PlaceDetileView(){
        return(
            <div className="place_detile_main_page_wrapper">
                <div className="mobile_back_btn">
                    <Link to={`/placeList`}>
                        <RegularButton lable={'Back'}/>
                    </Link>
                </div>
                <div className="monitor_service_button_row">
                        <div className="service_row_button_wrapper">
                            <Link to={`/placeList`}>
                                <RegularButton lable={'Back'}/>
                            </Link>
                        </div>
                        <div className="service_row_button_wrapper delete" onClick={()=>setDelete_active(true)}>
                            <RegularButton lable={'Delete place'} />
                        </div>

                        <div className="service_row_button_wrapper change" onClick={()=>setAdd_place_active(true)}>
                            <RegularButton lable={'Change place'} />
                        </div>      
                </div>
                <div className="main_buttons_wrapper">

                
                    <div className="place_detaile_main_buttons_wrapper">
                        <div className="main_btn_container">
                            <OrdersMainBtn place={place}/>
                            <div className="place_detaile_button_wrapper">
                                <Link to={`/${placeName}/${placeId}/orders/new_order`}>
                                    <AddButton lable={'Add order'} />  
                                </Link>
                                   
                            </div>
                        </div>
                        <div className="main_btn_container">
                            <MenusMainBtn place={place}/>
                            <div className="place_detaile_button_wrapper" onClick={()=>setAdd_menu_active(true)}>
                                <AddButton lable={'Add menu'} />
                            </div>
                        </div>
                    </div>

                    <div className="place_detaile_main_buttons_wrapper">
                        <div className="main_btn_container">
                            <ManagersMainBtn place={place}/>
                            <div className="place_detaile_button_wrapper" onClick={()=>setAdd_manager_active(true)}>
                                <AddButton lable={'Add manager'} />
                            </div>
                        </div>
                        <div className="main_btn_container">
                            <InvoicesMainBtn place={place}/>
                            <div className="place_detaile_button_wrapper" onClick={()=>setAdd_invoce_active(true)}>
                                <AddButton lable={'Add invoice'} />
                            </div>
                        </div>  
                    </div>
                </div>
                <div className="plce_detile_footer"></div>
                <div className="mobile_service_btn_row">
                    <div className="service_row_button_wrapper delete" onClick={()=>setDelete_active(true)}>
                        <RegularButton lable={'Delete place'} />
                    </div>

                    <div className="service_row_button_wrapper change" onClick={()=>setAdd_place_active(true)}>
                        <RegularButton lable={'Change place'} />
                    </div>   
                </div>

                {/* <PopupAddOrder add_order_active={add_order_active} setAdd_order_active={setAdd_order_active}/> */}
                <PopupAddInvoice place={place} add_invoice_active={add_invoice_active} setAdd_invoice_active={setAdd_invoce_active}/>
                <PopupAddMenu  add_menu_active={add_menu_active} setAdd_menu_active={setAdd_menu_active}/>
                <PopupAddManager place={place} add_manager_active={add_manager_active} setAdd_manager_active={setAdd_manager_active}/>
                <PopupAddPlace 
                    add_place_active={add_place_active} 
                    setAdd_place_active={setAdd_place_active}/>
                <PopupDelete subject={`palce ${place.name}`}  delete_active={delete_active} setDelete_active={setDelete_active} func={DeletePlace}/>
            </div>
        )
    }

    function Render(props){
        let isLoaded = props;
        if (isLoaded){
            return PlaceDetileView()
        } else{
            return(
                <div>Loading</div>
            )
        }
    }

    return(
        Render(loaded)                  
    )
}