import React from "react";
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context";
import { useParams } from "react-router-dom";
import { NetworkManager } from "../../../components/network_manager";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RegularButton } from "../../../components/buttons/regular_button";
import { PopupDelete } from "../../../components/popup/popup_delete";
import { OrderStates } from "../OrderStates/OrderStates";


export function UpdateOrderButton(){
    let orderItemContext = useOrderItemListContext()
    let order = orderItemContext.getOrderContext
    let {placeName} = useParams();
    let {placeId} = useParams();
    let network_manager = new NetworkManager()
    let navigate = useNavigate()

    function updateOrder(){
        // let total = {
        //     total_price: calculateTotal() 
        // } 

        network_manager.update_order(order.id,orderItemContext.item_list)
        
        // for (let order_item  of orderItemContext.item_list){
        //     let notCurrentMenu = false
        //     if(order_item.new_item){
        //         console.log('new_order_item_update',order_item)
        //         network_manager.create_order_item(order_item)
        //             .then(response => {
        //                 console.log(response);
        //             })
        //             .catch(error => {
        //                 if(error.response.data=='ErorrNotCurrentMenu'){
        //                     notCurrentMenu = true
        //                     console.log('error',error.response.data);
        //                     // throw error;
        //                     console.log('OK')
        //                     console.log('error',error.response.data);
        //                 }
                        
        //             });
        //         }
        //     if(notCurrentMenu){
        //         console.log('not current menu')
        //         break
        //     }
        // }
        // orderItemContext.item_list.map(order_item =>{
        //     if(order_item.new_item){
        //         console.log('new_order_item_update',order_item)
        //         network_manager.create_order_item(order_item)
        //             .then(response => {
        //                 console.log(response);
        //             })
        //             .catch(error => {
        //                 console.log(error);
        //                 throw error;
        //             });
        //         }
        // });
        // orderItemContext.delete_item_list.map((order_item) =>{
        //     console.log('deleted',orderItemContext.delete_item_list)

        //     network_manager.delete_order_item(order_item.id)
        //         .then(response =>{
        //             console.log('item deleted', response);
        //         })
        //         .catch(error=>{
        //             console.log(error);  
        //             throw error;
        //         });
        //     console.log('deleted',orderItemContext.delete_item_list)
        // });
        
        // network_manager.update_order_total(order.id, total)
        //     .then(response => {
        //         console.log('UPDATE',response);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         throw error;
        //     });
        navigate(`/${placeName}/${placeId}/orders`)
    }


    // function calculateTotal(){
    //     let result = 0
    //     orderItemContext.item_list.map(item =>(
    //         result = Number(result) + Number(item.item_price)
    //     ))
    //     return (result.toFixed(2))
    // }

    return(
        <div className='order_update_btn' onClick={updateOrder}>
            <RegularButton lable={'Update'}/> 
        </div>

    )
}

export function CreateOrderButton({date}){
    let orderItemContext = useOrderItemListContext()
    let {placeName} = useParams();
    let {placeId} = useParams();
    let network_manager = new NetworkManager()
    let navigate = useNavigate()
    
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
        navigate(`/${placeName}/${placeId}/orders`)
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
        </div>
    )
}

export function DeleteOrderButton(){
    let orderItemContext = useOrderItemListContext()
    let network_manager = new NetworkManager()
    let {placeName} = useParams();
    let {placeId} = useParams();
    let navigate = useNavigate()
    let order = orderItemContext.getOrderContext
    let [delete_active,setDelete_active] = useState(false);

    function deleteOrder(){
        console.log('Order ID', order.id)
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

    return(
        <div className='order_delete_button_wrapper'>
            <div className="order_detaile_delete_btn" onClick={()=>setDelete_active(true)}>            
                <RegularButton lable={'Delete order'} />
            </div>
            <PopupDelete subject={`Order №: ${order.id} on ${order.date}`}  delete_active={delete_active} setDelete_active={setDelete_active} func={deleteOrder}/>
        </div>
        
    )
}


export function OrderTopButtonLine({date}){
    let orderItemContext = useOrderItemListContext()
    let order = orderItemContext.getOrderContext
    let {placeName} = useParams();
    let {placeId} = useParams();

    function renderButtonLine(orderId){
        if (orderId){
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
