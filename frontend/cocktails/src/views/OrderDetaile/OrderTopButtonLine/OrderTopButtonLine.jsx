import React from "react";
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context";
import { useParams } from "react-router-dom";
import { NetworkManager } from "../../../components/network_manager";
import { useManeContext } from "../../../components/main_context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RegularButton } from "../../../components/buttons/regular_button";
import { PopupDelete } from "../../../components/popup/popup_delete";
import { OrderStates } from "../OrderStates/OrderStates";
import { PopupRegularMessage } from "../../../components/popup/popup_regular_message";


export function UpdateOrderButton(){
    let orderItemContext = useOrderItemListContext()
    let order = orderItemContext.getOrderContext
    let {placeName} = useParams();
    let {placeId} = useParams();
    let network_manager = new NetworkManager()
    let navigate = useNavigate()
    let mainContext = useManeContext()
    let user = mainContext.getUserFromMainContext()
    let [regular_message_active, setRegular_message_active] = useState(false)

    function updateOrder(){
        network_manager.update_order(order.id,orderItemContext.item_list)
        .then(response=>{
            navigate(`/${placeName}/${placeId}/orders`)
        })
        .catch(error=>{
            if (error.response.data == "ErrorNotCurrentMenu"){
                setRegular_message_active(true)
            }
            console.log(error);
            throw error;
        });
    }


    function renderButton(){
        if (user.role_name==='counter' || order.state==='Created'){
            return(
                <div className='order_update_btn' onClick={updateOrder}>
                <RegularButton lable={'Update'}/> 
                <PopupRegularMessage 
                message={'You try to ordering cocktails from not current menu. Sorry...'}
                regular_message_active={regular_message_active}
                setRegular_message_active ={setRegular_message_active}
                customFunction = {()=>{window.location.reload()}}
                />
            </div>
            )
        }

    }

    return(
        renderButton() 
    )
}

export function CreateOrderButton({date}){
    let orderItemContext = useOrderItemListContext()
    let {placeName} = useParams();
    let {placeId} = useParams();
    let network_manager = new NetworkManager();
    let navigate = useNavigate();
    let [regular_message_active, setRegular_message_active] = useState(false)

    function createOrder(){
        let form ={
            order:{
                place:placeId,
                date:date,
                total_price:calculateTotal(),
                },
                order_item_list:orderItemContext.item_list
        }
        network_manager.create_order(form)
        .then(response=>{
            navigate(`/${placeName}/${placeId}/orders`)
        })
        .catch(error=>{
            if (error.response.data == "ErrorNotCurrentMenu"){
                setRegular_message_active(true)
            }
            console.log(error);
            throw error;
        });
    }

    function calculateTotal(){
        let result = 0
        orderItemContext.item_list.map(item =>(
            result = Number(result) + Number(item.item_price)
        ))
        return (result.toFixed(2))
    }

    return(
        <div className='order_update_btn' onClick={createOrder}>
            <RegularButton lable={'Create'}/>    
            <PopupRegularMessage 
            message={'You try to ordering cocktails from not current menu. Sorry...'}
            regular_message_active={regular_message_active}
            setRegular_message_active ={setRegular_message_active}
            customFunction = {()=>{window.location.reload()}}
            />                   
        </div>
    )
}

export function DeleteOrderButton(){
    let orderItemContext = useOrderItemListContext()
    let network_manager = new NetworkManager()
    let {placeName} = useParams();
    let {placeId} = useParams();
    let navigate = useNavigate()
    let mainContext = useManeContext()
    let user = mainContext.getUserFromMainContext()
    let order = orderItemContext.getOrderContext
    let [delete_active,setDelete_active] = useState(false);

    function deleteOrder(){
        console.log('Order ID', order)
        network_manager.delete_order(order.id)
            .then(response =>{
                console.log('order was deleted', response);
                navigate(`/${placeName}/${placeId}/orders`)
            })
            .catch(error=>{
                console.log(error);
                throw error;
            });
    }

    function renderButton(){
        if (user.role_name==='counter' || order.state==='Created'){
            return(
                <div className='order_delete_button_wrapper'>
                    <div className="order_detaile_delete_btn" onClick={()=>setDelete_active(true)}>            
                        <RegularButton lable={'Delete order'} />
                    </div>
                    <PopupDelete subject={`Order №: ${order.id} on ${order.date}`}  delete_active={delete_active} setDelete_active={setDelete_active} func={deleteOrder}/>
                </div>
            )
        }
    }

    return(
        renderButton()    
    )
}


export function OrderTopButtonLine({date}){
    let orderItemContext = useOrderItemListContext()
    let order = orderItemContext.getOrderContext

    let {placeName} = useParams();
    let {placeId} = useParams();

    function renderButtonLine(order){
        if (order){
            return(
                <div className="order_detaile_buttons_line_monitor">
                    <div className="order_detaile_back_btn">
                        <Link to={{pathname: `/${placeName}/${placeId}/orders`,}} replace>
                            <RegularButton lable={'Back'}/>
                        </Link> 
                    </div>
                    <DeleteOrderButton/>
                    <UpdateOrderButton/>
                    <div className='order_state_btn'>
                        <OrderStates/> 
                    </div>
                </div>
            )    
        }else{
            return(
                <div className="order_detaile_buttons_line_monitor">
                    <div className="order_detaile_back_btn">
                        <Link to={{pathname: `/${placeName}/${placeId}/orders`,}} replace>
                            <RegularButton lable={'Back'}/>
                        </Link> 
                    </div>
                    <div className="order_create_btn">
                        <CreateOrderButton date={date}/>
                    </div>
                </div>
            )
        }
    }

    return(
            renderButtonLine(order)
    )
}


export function MobileButtonLineTop({date}){
    let orderItemContext = useOrderItemListContext()
    let order = orderItemContext.getOrderContext
    let {placeName} = useParams();
    let {placeId} = useParams();

    if(order){
        return(
            <div className="order_detaile_buttons_line_mobile">
                <div className="order_detaile_back_btn">
                    <Link to={{pathname: `/${placeName}/${placeId}/orders`,}} replace>
                        <RegularButton lable={'Back'}/>
                    </Link> 
                </div>
                <div className='order_state_btn'>
                    <OrderStates/> 
                </div>
            </div>
        )  
    }else{
        return(
            <div className="order_detaile_buttons_line_mobile">
                <div className="order_detaile_back_btn">
                    <Link to={{pathname: `/${placeName}/${placeId}/orders`,}} replace>
                        <RegularButton lable={'Back'}/>
                    </Link> 
                </div>
                <div className="order_create_btn">
                    <CreateOrderButton date={date}/>
                </div>   
            </div>
        )
    }
}


export function MobileButtonLineBottom(){
    let orderItemContext = useOrderItemListContext()
    let order = orderItemContext.getOrderContext

    if (order){
        return(
            <div className="order_detaile_buttons_line_mobile">
                <DeleteOrderButton/>
                <UpdateOrderButton/>
            </div>
        )
    }else{
        return(
            <div className="order_detaile_buttons_line_mobile">
                {/* <DeleteOrderButton/>
                <UpdateOrderButton/> */}
            </div>
        )
    }
    

}
