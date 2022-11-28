import React from "react";
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context";
import { useParams } from "react-router-dom";
import { NetworkManager } from "../../../components/network_manager";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RegularButton } from "../../../components/buttons/regular_button";
import { PopupDelete } from "../../../components/popup/popup_delete";

export function OrderTopButtonLine({date}){
    let orderItemContext = useOrderItemListContext()
    let orderId = orderItemContext.getOrderIdContext
    let order = orderItemContext.getOrderContext
    let {placeName} = useParams();
    let {placeId} = useParams();
    let network_manager = new NetworkManager()
    let navigate = useNavigate()
    let [delete_active,setDelete_active] = useState(false);

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


    function updateOrder(){
        let total = {
            total_price: calculateTotal() 
        } 
        orderItemContext.item_list.map(order_item =>{
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
        orderItemContext.delete_item_list.map((order_item) =>{
            console.log('deleted',orderItemContext.delete_item_list)

            network_manager.delete_order_item(order_item.id)
                .then(response =>{
                    console.log('item deleted', response);
                })
                .catch(error=>{
                    console.log(error);  
                    throw error;
                });
            console.log('deleted',orderItemContext.delete_item_list)
        });
        
        network_manager.update_order_total(order.id, total)
            .then(response => {
                console.log('UPDATE',response);
            })
            .catch(error => {
                console.log(error);
                throw error;
            });
            navigate(`/${placeName}/${placeId}/orders`)
    }


    function calculateTotal(){
        let result = 0
        orderItemContext.item_list.map(item =>(
            result = Number(result) + Number(item.item_price)
        ))
        return (result.toFixed(2))
    }



    function renderButtonLine(orderId){
        if (orderId){
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
                            <RegularButton lable={'Update'}/> 
                    </div>
                    <PopupDelete subject={`Order №: ${order.id} on ${order.date}`}  delete_active={delete_active} setDelete_active={setDelete_active} func={deleteOrder}/>
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
                            <RegularButton lable={'Create'}/>                       
                    </div>
                </div>
            )
        }
    }

    return(
        <div>
            {renderButtonLine(order)}
        </div>

    )
}

