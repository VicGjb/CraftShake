import React, {useEffect,useState} from "react"
import { NetworkManager } from "../../components/network_manager";
import {useParams} from 'react-router-dom';
import { OrderItemListContextProvider } from "./OrderDetaileContext/order_item_list_context";
import {OrderDetaileContent} from "./order_detaile_content"; 

export function OrderDetaile(){
    let {placeId} = useParams();
    let network_manager = new NetworkManager()
    let [order, setOrder] = useState({});
    let {orderId} = useParams();
    let [menus, setMenus] = useState([])
    let [loaded, setLoaded] = useState(false);
    let [menu_loaded, setMenuLoaded] = useState(false);

    useEffect(() => {
        network_manager.get_order_detaile(orderId)
            .then(order => { 
                    setOrder(order);
                    setMenus(order.menus);
                    setMenuLoaded(true);
                    setLoaded(true);
            })
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