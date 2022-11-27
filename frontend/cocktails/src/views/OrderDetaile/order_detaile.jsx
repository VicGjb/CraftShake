import React, {useEffect,useState} from "react"
import { NetworkManager } from "../../components/network_manager";
import {useParams} from 'react-router-dom';
import { OrderItemListContextProvider } from "./OrderDetaileContext/order_item_list_context";
import {OrderDetaileContent} from "./order_detaile_content"; 

export function OrderDetaile(){
    let {placeId} = useParams();
    let network_manager = new NetworkManager()
    let {orderId} = useParams();
    let [menus, setMenus] = useState([])
    let [loaded, setLoaded] = useState(false);


    useEffect(() => {
        network_manager.get_menus_list(placeId)
            .then(menus => { 
                    setMenus(menus);
                    setLoaded(true);
            })
    }, [placeId])


    function orderView(){
        if(loaded){
            return(
            <div>
                <OrderDetaileContent place={placeId} menus={menus} orderId={orderId}/>
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