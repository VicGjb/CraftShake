import React, { useEffect, useState } from "react";
import { NetworkManager } from "../../components/network_manager";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useManeContext } from "../../components/main_context";
import { AddButton } from "../../components/buttons/add_button";
import { PopupAddOrder } from "../../components/popup/popup_add_order";
import { RegularButton } from "../../components/buttons/regular_button";
import { OrderCard } from "./order_card";
import { OrderListTableHead } from "./OrderListTableHead";
import '../../styles/order_list.scss'

export function OrderList(){
    let main_context = useManeContext()
    let network_manager = new NetworkManager()
    let [order, setOrder] = useState([]);
    let {placeId} = useParams();
    let [add_order_active, setAdd_order_active] = useState(false)
    let defaultForm = {
        date_from: '',
        date_to:'',
        place: {placeId}
    }
    let [form, setForm] = useState(defaultForm);

    useEffect(()=> {
        network_manager.get_orders_list(placeId)
        .then(orders => {
            setOrder(orders);
    })
    }, [placeId])

    let changeHandler = e =>{
        setForm({...form, [e.target.name]:e.target.value, ['place']:placeId});
    }
    function SearchOrders(e){
        e.preventDefault()
        network_manager.search_order(placeId, form.date_from, form.date_to)
        .then(orders =>{
                setOrder(orders);
                console.log('Orders',orders)
            })
    }
    
    return (
        <div className="order_list_wrpper">
            <div className="service_button_row">
                <div className="service_row_button_wrapper back" onClick={main_context.goBack}>
                    <RegularButton lable={'Back'}/>
                </div>
                <div className="service_row_button_wrapper add">
                    <Link to={`new_order`} key={order.id}>
                        <AddButton  lable={'Add order'} />   
                    </Link>
                </div>
            </div>
            <form onSubmit={SearchOrders} className='order_list_search_wrapper'>
                <div className="order_list_search_inputs_wrapper">
                    <div className="date_wrapper">
                        <div className="date_lable">
                            From
                        </div>
                        <div>
                            <input
                                className="date_input"
                                type='date'
                                name='date_from'
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                    <div className="date_wrapper">   
                        <div className="date_lable">
                            To
                        </div>
                        <div>
                            <input
                                className="date_input"
                                type='date'
                                name='date_to'
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                </div>
                <div className="order_list_search_button" type="submit">
                    <RegularButton lable={'Filter'}></RegularButton>
                </div>               
            </form>           
            
            <div className="orders_table">
                <OrderListTableHead/>
                {order.map(order=>(
                    <Link to={`${order.id}`} key={order.id}>
                        <OrderCard order={order}/>
                    </Link>
                ))}
            </div>
                    
            <PopupAddOrder add_order_active={add_order_active} setAdd_order_active={setAdd_order_active}/>
        </div>
    )
}