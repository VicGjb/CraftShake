import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

let OrderItemListContext = React.createContext();

export function useOrderItemListContext(){
    return useContext(OrderItemListContext)
}

export function OrderItemListContextProvider({children}){
    let [orderId, setOrderId] = useState();
    let [item_list, setItemList] = useState([]);
    let [delete_item_list, setDeleteItemList] =useState([]);

    function setOrderIdContext(id){
        setOrderId(id)
    }

    function setUUIDForListFromBase(list){
        list.map(item=>{
            item.uuid = uuidv4()
        })
        console.log(list)
    }

    function setItemListContext(list){
        setItemList(list)
        console.log('ItemList in context',item_list)
    }

    function addItemInList(item){
        setItemList(item_list=>[...item_list, item])
    }

    function removeItemContext(order_item){
        setItemList(item_list.filter(item=>item.uuid!==order_item.uuid))
        if (!order_item.new_item){
            delete_item_list.push(order_item)
            setDeleteItemList(delete_item_list)
            }
    }



    return(
        <OrderItemListContext.Provider value={{
            setOrderIdContext:setOrderIdContext,
            getOrderIdContext:orderId,
            addItem:addItemInList,
            removeItem:removeItemContext,
            setItemList:setItemListContext,
            setUUIDForListFromBase:setUUIDForListFromBase,
            item_list:item_list,
            delete_item_list:delete_item_list
            }}>
            {children}
        </OrderItemListContext.Provider>
    )
}