import React, { useEffect } from "react";
import { NetworkManager } from "../../api/network_manager";
import { useState } from "react";
import { OrderPositions } from "./order_positions/order_positions";
import { useOrderItemListContext } from "./OrderDetaileContext/order_item_list_context";
import { MobileButtonLineTop } from "./OrderTopButtonLine/OrderTopButtonLine";
import { MobileButtonLineBottom } from "./OrderTopButtonLine/OrderTopButtonLine";
import { OrderTopButtonLine } from "./OrderTopButtonLine/OrderTopButtonLine";
import { DeliveredPhotoPopup } from "./DeliveredPhoto";
import {ReactComponent as CameraIcon} from "../../svg/camera_icon.svg"
import { MenuPositionRow } from "./menu_position/menu_position_row";
import { useMainContext } from "../../router/main_context";
import { Loading } from "../../components/loader";
import { UploadOrderPhotoPopup } from "./OrderStates/UploadOrderPhoto";
import '../../styles/order_detile.scss'

export function OrderDetaileContent({orderId, menus}){
    let mainContext = useMainContext()
    let user = mainContext.getUserFromMainContext()
    let [loaded, setLoaded] = useState(false);
    let order_detaile_context = useOrderItemListContext();
    let network_manager =  new NetworkManager();
    let order = order_detaile_context.getOrderContext
    let date = new Date()
    let dateNow = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}` 
    let [dateOrder, setDateOrder] = useState(dateNow);
    let [deliveredPhotoActive, setDeliveredPhotoActiv] = useState();
    
    useEffect(()=>{
        if (orderId){
            order_detaile_context.setMenusContext(menus)
            order_detaile_context.initMobileMenuPositions(menus)
            order_detaile_context.setOrderIdContext(orderId)
            network_manager.get_order_detaile(orderId)
            .then(order =>{
                setLoaded(true)
                order_detaile_context.setUUIDForListFromBase(order.order_item)
                order_detaile_context.setItemList(order.order_item) 
                order_detaile_context.setOrderContext(order)
            })
        }else{
            order_detaile_context.setMenusContext(menus)
        }
    },[])


    function dateChangeHendler(e){
        //console.log(e.target.value)
        setDateOrder(e.target.value)
    }

    function renderNewOrderDate(order,dateNow){
        if (!order){
            //console.log(dateNow)
            return(
            <div className="add_order_date">
                <div className="add_order_date_container">
                    <div className="date_lable">
                        Date
                    </div>
                    <div>
                        <input
                            className="date_input"
                            type='date'
                            name='date'
                            defaultValue={`${dateOrder}`}
                            onChange={dateChangeHendler}
                        />
                    </div>  
                </div>  
            </div>
        )
        }
    }

    function renderOrderPhoto(order){
        if(order && order.photo){
            return(
                <div>
                    <div className="camera_icon_conteiner" onClick={()=>setDeliveredPhotoActiv(true)}>
                        <CameraIcon className='camera_icon' /> 
                    </div>
                    <DeliveredPhotoPopup deliveredPhotoActive={deliveredPhotoActive} setDeliveredPhotoActiv={setDeliveredPhotoActiv} />
                </div>
           )
        }else{
            return(
                <div className="indent"></div>
            )
        }
    }


    function renderMenuTable(){
        if (order){
            if (order.open_to_customer || user.role==='counter'){
                return(
                    <div className="menu_positions_table">
                            {menus.map(menu=>(
                                renderMenu(menu)
                            ))}
                    </div>
                )
            }
        }else{
            return(
                <div className="menu_positions_table">
                        {menus.map(menu=>(
                            renderMenu(menu)
                        ))}
                </div>
            )
        }
        
    }
    function renderMenu(menu){
        if(menu.is_current_menu) {  
            return(
                <div className="order_detaile_menu_wrapper" key={menu.id}>
                    <div className="order_detaile_menu_title">
                        {menu.name}
                    </div>
                    <div className="order_detaile_menu_positions">
                        {menu.position_in_menu.map(position=>(
                            <MenuPositionRow position={position} key={position.id}/>
                        ))}
                    </div>
                </div>
            )
        }
    }
    
    function OrderDetaileContentView(isNewOrder){
        return(
            <div className="order_detaile_wrapper">
                <OrderTopButtonLine order={order} date={dateOrder}/>
                <MobileButtonLineTop date={dateOrder}/>
                <div className="order_detaile_content_title">
                    <div className="indent"></div>
                    <div className="order_title">
                        {orderId 
                            ? `Order №: ${order.id} on ${order.date.split('-').reverse().join('.')}`
                            : `New Order`
                        }
                    </div>
                    {renderOrderPhoto(order)}
                </div>  
                {renderNewOrderDate(orderId, dateNow)}
                <div className="order_detaile_tables_wrapper">
                        {renderMenuTable()}
                        <OrderPositions/>
                </div>
                <div className="order_detaile_footer">
                    <MobileButtonLineBottom />
                </div> 
                {isNewOrder?<></>
                :<UploadOrderPhotoPopup/>
                }
                
            </div>
        )
    }

    function renderPage(props){
        if(props.orderId){
            if(props.loaded){
                return OrderDetaileContentView(false)
            }else{
                return(
                    <Loading/>
                )
            } 
        }else{
            return OrderDetaileContentView(true) 
        }
    }
    return(
           renderPage({loaded,orderId})
    )
}