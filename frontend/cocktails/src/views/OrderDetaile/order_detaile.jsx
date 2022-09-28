import React, {useEffect,useState} from "react";
import axios from 'axios';
import {useLocation, useParams} from 'react-router-dom';
import { OrderItemListContextProvider } from "./OrderDetaileContext/order_item_list_context";
import {OrderDetaileContent} from "./order_detaile_content"; 

export function OrderDetaile(){
    let {placeId} = useParams();
    let [order, setOrder] = useState({});
    let {orderId} = useParams();
    let [menus, setMenus] = useState([])
    let [loaded, setLoaded] = useState(false);
    let [menu_loaded, setMenuLoaded] = useState(false);

    useEffect(() => {
        axios({
          method: 'GET',
          url: `http://127.0.0.1:8000/api/counter/order/${orderId}/`
            }).then(response => { 
                setOrder(response.data);
                setLoaded(true);
        }).then(
            axios({
                method: 'GET',
                url: `http://127.0.0.1:8000/api/counter/menu/?place=${placeId}`
                }).then(response => { 
                    setMenus(response.data.results);
                    setMenuLoaded(true);
                })
        )
    }, [orderId])


    function orderView(){
        if(menu_loaded){
            return(
            <div>
                <OrderDetaileContent place={placeId} menus={menus} order={order}/>
            </div>
            )
        }else{
            return(
                <div>
                    <div>
                        Loading
                    </div>
                </div>
            )
        }        
    }

    function Render(props){
        if(props){
            return orderView()
        }else{
            return(
                <div>Loading</div>
            )
        }

    }return(
        <div>
            <OrderItemListContextProvider>
                {Render(loaded)}
            </OrderItemListContextProvider> 
        </div>
    )
}