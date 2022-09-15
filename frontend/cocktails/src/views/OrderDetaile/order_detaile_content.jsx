import React from "react";
import axios from "axios";
import { RegularButton } from "../../components/buttons/regular_button";
import { Link, NavLink,Route, Routes, Outlet } from "react-router-dom";
import { MenuPositions } from "./menu_position/menu_position";
import { OrderPositions } from "./order_positions/order_positions";
import { useOrderItemListContext } from "./OrderDetaileContext/order_item_list_context";
import { OrderDetaileMenuRoute } from "./order_detaile_router";

export function OrderDetaileContent({order, menus, place}){
    let order_positions = useOrderItemListContext();

    function calculateTotal(){
        let result = 0
        order.order_item.map(item =>(
            result = Number(result) + Number(item.item_price)
        ))
        return (result.toFixed(2))
    }


    function updateOrder(){
        let total = {
            total_price: calculateTotal()
        } 
        order_positions.add_list.map(order_item =>{
            if(order_item.new_item){
                axios
                    .post('http://127.0.0.1:8000/api/counter/order-item/create/', order_item)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                        throw error;
                    });
                    
                }
        });
        order_positions.delete_list.map((order_item,index) =>{
            console.log('deleted',order_positions.delete_list)
            axios
                .post(`http://127.0.0.1:8000/api/counter/order-item/${order_item.id}/delete/`)
                .then(response =>{
                    console.log('item deleted', response);
                })
                .catch(error=>{
                    console.log(error);  
                    throw error;
                });
                console.log('deleted',order_positions.delete_list)
        });
        

        axios
			.post(`http://127.0.0.1:8000/api/counter/order/update/${order.id}/`, total)
			.then(response => {
				console.log('UPDATE',response);
            })
            .catch(error => {
				console.log(error);
				throw error;
			});
        order_positions.clean()
    }

    function deleteOrder(){
        console.log('Order ID', order.id)
        axios
        .post(`http://127.0.0.1:8000/api/counter/order/${order.id}/delete/`)
        .then(response =>{
            console.log('order was deleted', response);
        })
        .catch(error=>{
            console.log(error);
            throw error;
        });
    }

    function MenuRender(menu){
        if(menu.is_current_menu){
            return(
                <div key={menu.id}>
                    <NavLink className='regular_text_small menu_name_link' to={`menu/${menu.id}`}  state={{from: place}}>
                        {menu.name}
                    </NavLink>  
                </div>
            )
        }
    }

    return(
        <div className="order_detaile_content">
            <div className="order_detaile_content_title regular_text">
                Order №: {order.id} on {order.date} 
            </div>
            <div className="order_detaile_buttons_line">
                <div className="order_detaile_back_btn">
                    <Link to={{pathname: `/${place.id}/${place.name}/orders`,}} replace state={{from: place}}>
                        <RegularButton lable={'Back'}/>
                    </Link> 
                </div>
                <div className="order_detaile_delete_btn" onClick={deleteOrder}>
                <Link to={{pathname: `/${place.id}/${place.name}/orders`,}} replace state={{from: place}}>
                    <RegularButton lable={'Delete order'} />
                </Link>
                </div>
                <div className='order_update_btn' onClick={updateOrder}>
                    <Link to={{pathname:`/${place.id}/${place.name}/orders`}} replace state={{from: place}}>
                        <RegularButton lable={'Update'}/>
                    </Link>
                </div>
            </div>

            <div className="order_detaile_tables_wrapper">
                <div className="menu_positions_table">
                    <div className="order_detaile_menu_name">
                        {menus.map(menu=>(
                            MenuRender(menu)
                        ))}
                    </div> 
                <OrderDetaileMenuRoute order={order}/> 
                </div>
                <OrderPositions order={order}/>
            </div>

            

        </div>
    )
}