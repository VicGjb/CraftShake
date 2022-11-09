import React, {useEffect,useState} from "react";
import {useParams} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { NetworkManager } from "../../components/network_manager";
import { useManeContext } from "../../components/main_context";
import { InvoicesMainBtn } from "../../components/buttons/invoices_main_btn";
import { OrdersMainBtn } from "../../components/buttons/orders_main_btn";
import { MenusMainBtn } from "../../components/buttons/menus_main_btn";
import { ManagersMainBtn } from "../../components/buttons/managers_main_btn";
import { AddButton } from "../../components/buttons/add_button";
import { PopupAddOrder } from "../../components/popup/popup_add_order";
import { PopupAddMenu } from "../../components/popup/popup_add_menu";
import { PopupAddInvoice } from "../../components/popup/popup_add_invoice";
import { PopupAddManager } from "../../components/popup/popup_add_manager";
import { PopupChangePlace } from "../../components/popup/popup_change_place";
import { PopupDelete } from "../../components/popup/popup_delete";
import { RegularButton } from "../../components/buttons/regular_button";
import { useLocation } from "react-router-dom";

export function PlaceDetaile(){
    let [place, setPlace] = useState({});
    let {placeId} = useParams();
    let [loaded, setLoaded] = useState(false);
    let network_manager = new NetworkManager()

    let [add_order_active, setAdd_order_active] = useState(false)
    let [add_invoice_active, setAdd_invoce_active] = useState(false)
    let [add_menu_active, setAdd_menu_active] = useState(false)
    let [add_manager_active, setAdd_manager_active] = useState(false)
    let [add_change_place_active, setAdd_Change_place_active] = useState(false)
    let [delete_active,setDelete_active] = useState(false)
    let navigate = useNavigate();
    let location = useLocation()
    let main_context = useManeContext();
    let reload='b'
 
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
            navigate(`/placeList` ,{replace:false, state:reload})
        ))
        .catch(error=>{
            console.log(error);
            throw error;
        });
    }

    function PlaceDetileView(){
        return(
            <div>
                <div className="service_button_row">
                        <div className="service_row_button_wrapper" onClick={main_context.goBack}>
                            <RegularButton lable={'Back'}/>
                        </div>
                        <div className="service_row_button_wrapper" onClick={()=>setDelete_active(true)}>
                            <RegularButton lable={'Delete place'} />
                        </div>

                        <div className="service_row_button_wrapper" onClick={()=>setAdd_Change_place_active(true)}>
                            <RegularButton lable={'Change place'} />
                        </div>      
                </div>
                <div className="palce_detaile_content">
                    <div className="place_detaile_main_buttons_wrapper">
                        <OrdersMainBtn place={place}/>
                        <MenusMainBtn place={place}/>
                        <ManagersMainBtn place={place}/>
                        <InvoicesMainBtn place={place}/>
                    </div>
                    <div className="place_detaile_add_buttons_wrapper">
                        <div className="place_detaile_button_wrapper" onClick={()=>setAdd_order_active(true)}>
                            <AddButton lable={'Add order'} />   
                        </div>
                        <div className="place_detaile_button_wrapper" onClick={()=>setAdd_invoce_active(true)}>
                            <AddButton lable={'Add invoice'} />
                        </div>
                        <div className="place_detaile_button_wrapper" onClick={()=>setAdd_menu_active(true)}>
                            <AddButton lable={'Add menu'} />
                        </div>
                        <div className="place_detaile_button_wrapper" onClick={()=>setAdd_manager_active(true)}>
                            <AddButton lable={'Add manager'} />
                        </div>
                    </div>
                </div>
                <PopupAddOrder add_order_active={add_order_active} setAdd_order_active={setAdd_order_active}/>
                <PopupAddInvoice place={place} add_invoice_active={add_invoice_active} setAdd_invoice_active={setAdd_invoce_active}/>
                <PopupAddMenu  add_menu_active={add_menu_active} setAdd_menu_active={setAdd_menu_active}/>
                <PopupAddManager place={place} add_manager_active={add_manager_active} setAdd_manager_active={setAdd_manager_active}/>
                <PopupChangePlace place={place} add_change_place_active={add_change_place_active} setAdd_Change_place_active={setAdd_Change_place_active}/>
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
        <div>
            {Render(loaded)}                  
        </div>
    )
}