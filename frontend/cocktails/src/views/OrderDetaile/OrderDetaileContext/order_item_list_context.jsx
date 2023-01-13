import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

let OrderItemListContext = React.createContext();

export function useOrderItemListContext(){
    return useContext(OrderItemListContext)
}

export function OrderItemListContextProvider({children}){
    let [orderId, setOrderId] = useState();
    let [order, setOrder] = useState();
    let [menus, setMenus] = useState([]);
    let [item_list, setItemList] = useState([]);
    let [delete_item_list, setDeleteItemList] =useState([]);
    let [uploadPhotoActive, setUploadPhotoActive] = useState(false)
    let mobileMenuPositions = {};


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



    function initMenuPositionMobile(menus){
        menus.map(menu=>{
            menu.position_in_menu.map(position =>{
                mobileMenuPositions[`${position.id}`] = ''
            })
        })
        console.log('INIT MOBILE',mobileMenuPositions)
    }

    function addItemMobile(orderItem){
        mobileMenuPositions[`${orderItem.position}`] = orderItem
        console.log('orderInemMobile', mobileMenuPositions)
        getItemListMobile()
    }
    function getItemListMobile(){
        let mobileItemList = []
        for(let [positionId, item] of Object.entries(mobileMenuPositions)){
            if(item){
                if(item.quantity>0){
                    mobileItemList.push(item)
                    console.log("OKEY",item)
                }  
            }
        }
        console.log('MObileItemList',mobileItemList)
        return mobileItemList
    }


    return(
        <OrderItemListContext.Provider value={{
            setOrderContext:setOrder,
            getOrderContext:order,
            setOrderIdContext:setOrderIdContext,
            getOrderIdContext:orderId,
            setMenusContext:setMenus,
            getMenusContext:menus,
            addItem:addItemInList,
            removeItem:removeItemContext,
            setItemList:setItemListContext,
            setUUIDForListFromBase:setUUIDForListFromBase,
            item_list:item_list,
            delete_item_list:delete_item_list,

            
            initMobileMenuPositions:initMenuPositionMobile,
            addItemMobile:addItemMobile,
            getItemListMobile:getItemListMobile,

            uploadPhotoActive:uploadPhotoActive,
            setUploadPhotoActive:setUploadPhotoActive,


            }}>
            {children}
        </OrderItemListContext.Provider>
    )
}