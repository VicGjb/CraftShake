import React, { useEffect } from "react";
import { NetworkManager } from "../../components/network_manager";
import { useState } from "react";
import { NavLink} from "react-router-dom";
import { OrderPositions } from "./order_positions/order_positions";
import { useOrderItemListContext } from "./OrderDetaileContext/order_item_list_context";
import { OrderDetaileMenuRoute } from "./order_detaile_router";
import { OrderStats } from "./OrderStates/OrderStates";
import { OrderTopButtonLine } from "./OrderTopButtonLine/OrderTopButtonLine";
import { DeliveredPhotoPopup } from "./DeliveredPhoto";

export function OrderDetaileContent({orderId, menus}){
    let [loaded, setLoaded] = useState(false);
    let order_detaile_context = useOrderItemListContext();;
    let network_manager =  new NetworkManager();
    let order = order_detaile_context.getOrderContext
    let date = new Date()
    let dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` 
    let [dateOrder, setDateOrder] = useState(dateNow);
    let [deliveredPhotoActive, setDeliveredPhotoActiv] = useState();

    useEffect(()=>{
        if (orderId){
            // order_detaile_context.setOrderIdContext(orderId)
            network_manager.get_order_detaile(orderId)
            .then(order =>{
                setLoaded(true)
                order_detaile_context.setUUIDForListFromBase(order.order_item)
                order_detaile_context.setItemList(order.order_item) 
                order_detaile_context.setOrderContext(order)
            })
        }
    },[])


    function renderMenu(menu){
        if(menu.is_current_menu){
            return(
                <div key={menu.id}>
                    <NavLink className='regular_text_small menu_name_link' to={`menu/${menu.id}`}>
                        {menu.name}
                    </NavLink>  
                </div>
            )
        }
    }


    function dateChangeHendler(e){
        console.log(e.target.value)
        setDateOrder(e.target.value)
    }

    function renderNewOrderDate(order,dateNow){
        if (!order){
            console.log(dateNow)
            return(
            <div className="add_order_popup_date">
                <div className="date_lable">
                    Date
                </div>
                <div>
                    <input
                        className="date_input"
                        type='date'
                        name='date'
                        defaultValue={`${dateNow}`}
                        onChange={dateChangeHendler}
                    />
                </div>
            </div>
        )
        }
    }


    function renderStateButton(order){
        if (order){
            return(
                <OrderStats/>
            )
        }
        
    }
    function renderOrderPhoto(order){
        if(order && order.photo){
            return(
                <div className="popup_title">
                    <div className="regular_text_small" onClick={()=>setDeliveredPhotoActiv(true)}>
                        Show delivered photo
                    </div>
                    <DeliveredPhotoPopup deliveredPhotoActive={deliveredPhotoActive} setDeliveredPhotoActiv={setDeliveredPhotoActiv} />
                </div>
           )
        }
    }
    
    function OrderDetaileContentView(){
        return(
            <div className="order_detaile_content">
                 <OrderTopButtonLine order={order} date={dateOrder}/>
                <div className="order_detaile_content_title regular_text">
                    <div className="order_title">
                        {orderId 
                        ? `Order №: ${order.id} on ${order.date}`
                        : `New Order`
                    }
                    </div>
                    
                    <div className="state_button_set">
                        {renderStateButton(orderId)}
                        {renderOrderPhoto(order)}
                    </div>
                    
                    
                    {renderNewOrderDate(orderId, dateNow)}
                </div>              
                <div className="order_detaile_tables_wrapper">
                    <div className="menu_positions_table">
                        <div className="order_detaile_menu_name">
                            {menus.map(menu=>(
                                renderMenu(menu)
                            ))}
                        </div> 
                        <OrderDetaileMenuRoute/> 
                        
                    </div>
                    
                    <div>        
                        <OrderPositions/>
                    </div>
                               
                </div>
            </div>
        )
    }

    function renderPage(props){
        if(props.orderId){
            if(props.loaded){
                return OrderDetaileContentView()
            }else{
                return(
                    <div>Loading</div>
                )
            } 
        }else{
            return OrderDetaileContentView() 
        }
    }
    return(
       <div>
           {renderPage({loaded,orderId})}
       </div>
    )
}