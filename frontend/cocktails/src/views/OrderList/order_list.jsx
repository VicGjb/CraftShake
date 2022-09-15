import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { PlaceSubtitle } from "../../components/place_subtitle";
import { AddButton } from "../../components/buttons/add_button";
import { PopupAddOrder } from "../../components/popup/popup_add_order";

export function OrderList(){
    let location = useLocation();
    let {from} = location.state;
    let place = from;
    let [order, setOrder] = useState([]);
    let {placeId} = useParams([]);

    let [add_order_active, setAdd_order_active] = useState(false)
    

    useEffect(()=> {
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/api/counter/order/?place=${placeId}`
        }).then(response => {
            setOrder(response.data.results);
    })
    }, [placeId])
    
    return (
        <div>
            <div>
                <PlaceSubtitle place={place}/>
                <div className="order_list_content">
                    <div className="order_list_content_title">
                        <p className="regular_text">Orders</p>
                    </div>
                    
                    <div className="order_list_container">

                        <div className="order_list_table_wrapper">
                            <div className="order_list_table">
                                <div className='thead'>
                                    <div className="order_list_table_head tr">
                                        <div className="th"><div className="regular_text">Date</div></div>
                                        <div className="th"><div className="regular_text">Id</div></div>
                                        <div className="th"><div className="regular_text">Total</div></div>
                                    </div>
                                </div >
                                <div className='tbody'>
                                    {order.map(order => (
                                        <Link to={`/orders/${order.id}`} state={{from: place}} key={order.id}>
                                            <div className="order_list_table_row tr">
                                                <div className="td"><div className="regular_text_small">{order.date}</div></div>
                                                <div className="td"><div className="regular_text_small">{order.id}</div></div>
                                                <div className="td"><div className="regular_text_small">{order.total_price}</div></div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>                
                            </div>
                        </div>
                        <div className="order_list_button_set">
                            <div className="add_batton_wrapper" onClick={()=>setAdd_order_active(true)}>
                                <AddButton  lable={'Add order'} />   
                            </div>
                        </div>        
                    </div>
                </div>
            </div>
            <PopupAddOrder add_order_active={add_order_active} setAdd_order_active={setAdd_order_active} place={place}/>
        </div>
    )
}