import React, { useEffect, useState } from "react";
import { NetworkManager } from "../../components/network_manager";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useManeContext } from "../../components/main_context";
import { AddButton } from "../../components/buttons/add_button";
import { PopupFilters } from "../../components/PopupFilters";
import { RegularButton } from "../../components/buttons/regular_button";
import { OrderCard } from "./order_card";
import { OrderListTableHead } from "./OrderListTableHead";
import '../../styles/order_list.scss'

export function OrderList(){
    let main_context = useManeContext()
    let network_manager = new NetworkManager()
    let [order, setOrder] = useState([]);
    let {placeId} = useParams();
    let {placeName} = useParams();
    let [filterActive, setFilterActive] = useState(false)

    useEffect(()=> {
        network_manager.get_orders_list(placeId)
        .then(orders => {
            setOrder(orders);
    })
    }, [placeId])
    
    return (
        <div className="order_list_wrpper">
            <div className="service_button_row">
                <div className="service_row_button_wrapper back" >
                    <Link to={`/${placeName}/${placeId}/detaile`}>
                        <RegularButton lable={'Back'}/>
                    </Link>
                </div>
                <div className="service_row_button_wrapper filter" onClick={()=>{setFilterActive(true)}}>
                        <AddButton  lable={'Filters'} />   
                </div>

                <div className="service_row_button_wrapper add">
                    <Link to={`new_order`} key={order.id}>
                        <AddButton  lable={'Add order'} />   
                    </Link>
                </div>
            </div>
    
            <div className="orders_table">
                <OrderListTableHead/>
                {order.map(order=>(
                    <Link to={`${order.id}`} key={order.id}>
                        <OrderCard order={order}/>
                    </Link>
                ))}
            </div>     
            <PopupFilters filterActive={filterActive} setFilterActive={setFilterActive} subject={'orders'} setSubject={setOrder} />               
        </div>
    )
}