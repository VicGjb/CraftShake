import React, { useEffect } from "react";
import { NetworkManager } from "../../components/network_manager";
import { RegularButton } from "../../components/buttons/regular_button";
import { useState } from "react";
import { Link, NavLink,useParams, useNavigate} from "react-router-dom";
import { OrderPositions } from "./order_positions/order_positions";
import { useOrderItemListContext } from "./OrderDetaileContext/order_item_list_context";
import { OrderDetaileMenuRoute } from "./order_detaile_router";
import { PopupDelete } from "../../components/popup/popup_delete";
import { OrderStats } from "./OrderStates/OrderStates";

export function OrderDetaileContent({orderId, menus}){
    let {placeName} = useParams();
    let {placeId} = useParams();
    let [order, setOrder] = useState();
    let [loaded, setLoaded] = useState(false);
    let order_detaile_context = useOrderItemListContext();
    let [delete_active,setDelete_active] = useState(false);
    let network_manager =  new NetworkManager();
    let navigate = useNavigate();
    let [date,setDate] = useState();

    useEffect(()=>{
        if (orderId){
            order_detaile_context.setOrderIdContext(orderId)
            network_manager.get_order_detaile(orderId)
            .then(order =>{
                setOrder(order)
                setLoaded(true)
                order_detaile_context.setUUIDForListFromBase(order.order_item)
                order_detaile_context.setItemList(order.order_item) 
            })
        }
    },[])

    function calculateTotal(){
        let result = 0
        order_detaile_context.item_list.map(item =>(
            result = Number(result) + Number(item.item_price)
        ))
        return (result.toFixed(2))
    }


    function createOrder(){
        let total = calculateTotal()
        let form ={
            order:{
                place:placeId,
                date:date,
                total_price:calculateTotal(),
                },
                order_item_list:order_detaile_context.item_list
        }
        network_manager.create_order(form)
        navigate(`/${placeName}/${placeId}/orders`)
    }
 
    function updateOrder(){
        let total = {
            total_price: calculateTotal() 
        } 
        order_detaile_context.item_list.map(order_item =>{
            if(order_item.new_item){
                console.log('new_order_item_update',order_item)
                network_manager.create_order_item(order_item)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                        throw error;
                    });
                }
        });
        order_detaile_context.delete_item_list.map((order_item,index) =>{
            console.log('deleted',order_detaile_context.delete_item_list)

            network_manager.delete_order_item(order_item.id)
                .then(response =>{
                    console.log('item deleted', response);
                })
                .catch(error=>{
                    console.log(error);  
                    throw error;
                });
            console.log('deleted',order_detaile_context.delete_item_list)
        });
        
        network_manager.update_order_total(orderId, total)
            .then(response => {
                console.log('UPDATE',response);
            })
            .catch(error => {
                console.log(error);
                throw error;
            });
            navigate(`/${placeName}/${placeId}/orders`)
    }

    function deleteOrder(){
        console.log('Order ID', orderId)
        network_manager.delete_order(orderId)
            .then(response =>{
                console.log('order was deleted', response);
                navigate(`/${placeName}/${placeId}/orders`)
            })
            .catch(error=>{
                console.log(error);
                throw error;
            });
    }

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

    function renderButtonLine(props){
        if (props){
            return(
                <div className="order_detaile_buttons_line">
                    <div className="order_detaile_back_btn">
                                <Link to={{pathname: `/${placeName}/${placeId}/orders`,}} replace>
                                    <RegularButton lable={'Back'}/>
                                </Link> 
                    </div>
                    <div className="order_detaile_delete_btn" onClick={()=>setDelete_active(true)}>            
                                <RegularButton lable={'Delete order'} />
                    </div>
                    <div className='order_update_btn' onClick={updateOrder}>
                        {/* <Link to={{pathname:`/${placeName}/${placeId}/orders`}} replace> */}
                            <RegularButton lable={'Update'}/>
                        {/* </Link> */}
                    </div>
                </div>
            )    
        }else{
            return(
                <div className="order_detaile_buttons_line">
                    <div className="order_detaile_back_btn">
                                <Link to={{pathname: `/${placeName}/${placeId}/orders`,}} replace>
                                    <RegularButton lable={'Back'}/>
                                </Link> 
                    </div>
                    
                    <div className='order_update_btn' onClick={createOrder}>
                        {/* <Link to={{pathname:`/${placeName}/${placeId}/orders`}} replace> */}
                            <RegularButton lable={'Create'}/>
                        {/* </Link> */}
                    </div>
                </div>
            )
        }
    }

    function dateChangeHendler(e){
        console.log(e.target.value)
        setDate(e.target.value)
    }

    function renderNewOrderDate(orderId){
        if (!orderId){
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
                        onChange={dateChangeHendler}
                    />
                </div>
            </div>
        )
        }
    }


    function renderStateButton(orderId){
        if (orderId){
            return(
                <OrderStats order={order} setOrder={setOrder}/>
            )
        }
        
    }
    function renderOrderPhoto(orderId){
        if(orderId && order.photo){
            return(
                <img src={order.photo} />
            )
        }
    }
    
    function OrderDetaileContentView(){
        return(
            <div className="order_detaile_content">
                <div className="order_detaile_content_title regular_text">
                    {orderId 
                        ? `Order №: ${order.id} on ${order.date}`
                        : `New Order`
                    }
                </div>
                {renderButtonLine(orderId)}
                
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
                    
                    {renderNewOrderDate(orderId)}
                    {renderStateButton(orderId)}
                        <OrderPositions/>
                    </div>
                
                        {renderOrderPhoto(orderId)}
                    
                                
                </div>
                {orderId
                    ?<PopupDelete subject={`Order №: ${order.id} on ${order.date}`}  delete_active={delete_active} setDelete_active={setDelete_active} func={deleteOrder}/>
                    :''
                }
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