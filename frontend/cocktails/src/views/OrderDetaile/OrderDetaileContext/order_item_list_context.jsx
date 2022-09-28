import React, { useContext, useEffect } from "react";
import { useState } from "react";

let OrderItemListContext = React.createContext();

export function useOrderItemListContext(){
    return useContext(OrderItemListContext)
}

export function OrderItemListContextProvider({children}){
    let [item_list, setItemList] = useState([]);
    let [delete_item_list, setDeleteItemList] =useState([]);
    let [add_list, setAddList] = useState([]);
    let [is_changed, setIsChanged] = useState(false);
    let update_data = {
        delete_list:[],
        add_list:[]
    }

    function CurrentOrderItemList(props){
        setItemList(props)
        console.log('ItemList',item_list)
    }

    function RemoveOrderItem(props){
        let index = item_list.indexOf(props)
        if (!props.new_item){
            delete_item_list.push(props)   
            }
        item_list.splice(index, 1)
        setAddList(item_list)
    }

    function AddOrderItem(props){
        item_list.push(props)
        setItemList(item_list)
        setAddList(item_list)
        console.log('AddOrderItem',item_list)
    }

    function IsChangedFlag(){
        setIsChanged(!is_changed)
    }

    function CleanUpdateData(){
        setDeleteItemList([])
        setAddList([])
    }


    return(
        <OrderItemListContext.Provider value={{
            list:item_list,
            update_order_positions:IsChangedFlag,
            current_order_item: CurrentOrderItemList,
            remove: RemoveOrderItem, 
            add: AddOrderItem,
            get_update_data: update_data,
            add_list:add_list,
            delete_list:delete_item_list,
            clean:CleanUpdateData,
            }}>
            {children}
        </OrderItemListContext.Provider>
    )
}