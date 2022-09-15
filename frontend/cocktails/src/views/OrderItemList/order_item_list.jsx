import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

export function OrderItemList(){
    let [item, setItem] = useState([]);
    let {orderId} = useParams([]);

    useEffect(()=> {
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/counter/order-item/?order=1'
        }).then(response => {setItem(response.data.results);
    })
    }, [orderId])
    return (
        <div>
            <div>
                {item.map(item => (
                    <p key={item.id}>{item.position_name} qty: {item.quantity} price: {item.item_price}</p>
                ))}
            </div>
        </div>
    )
}