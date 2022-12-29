import React, { useEffect, useState } from "react";
import { useManeContext } from "../../../components/main_context";
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context";
import { OrderPositionCard } from "./OrderPositionCard";
import { OrderPositionTableHead } from "./OrderPositionTableHead";
import { RegularButton } from "../../../components/buttons/regular_button";
import { PopupAddCocktailsMenu } from "../PopupAddCocktail";

export function OrderPositions(){   
    let [add_cocktails_active, setAdd_cocktails_active] = useState(false)
    let order_detaile_context = useOrderItemListContext()
    let mainContext = useManeContext()
    let user = mainContext.getUserFromMainContext()
    let order = order_detaile_context.getOrderContext

    function calculateTotal(){
        let result = 0
        order_detaile_context.item_list.map(order_item =>(
            result = Number(result) + Number(order_item.item_price)
        ))
        return (result.toFixed(2))
    }

    function renderAddCoctailButton(){
        if (order){
            console.log('order!!',order)
            if (order.open_to_customer || user.role_name==='counter'){
                return(
                    <div className="add_cocktails_btn" onClick={()=>{setAdd_cocktails_active(true)}}>
                        <RegularButton lable={'Add cocktails'}/>
                    </div>
                )
            }
        }else{
            return(
                <div className="add_cocktails_btn" onClick={()=>{setAdd_cocktails_active(true)}}>
                    <RegularButton lable={'Add cocktails'}/>
                </div>
            )
            
        }
        
    }

    return(
        <div className="order_positions_table_wrapper">
            <div className="order_info">   
                {renderAddCoctailButton()}
                <div className="order_detaile_total_monitor">  
                    Total: {calculateTotal()} ILS
                </div>
            </div>     
            <div className="order_positions_table">
                <OrderPositionTableHead/>
                {order_detaile_context.item_list.map(order_item=>(
                    <div className='positions_wrapper' key={order_item.uuid}>
                        <OrderPositionCard 
                            order_item={order_item} 
                        />
                    </div>
                ))}
            </div>
            <div className="total_mobile_wrapper">
                <div className="order_detaile_total_mobile">  
                    Total: {calculateTotal()} ILS
                </div>
            </div>
        <PopupAddCocktailsMenu add_cicktails_active={add_cocktails_active} setAdd_cocktails_active={setAdd_cocktails_active}/>  
        </div>
        )
}