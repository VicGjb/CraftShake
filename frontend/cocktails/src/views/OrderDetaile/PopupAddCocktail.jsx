import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { OrderDetaileMenuRoute } from "./order_detaile_router";
import { useOrderItemListContext } from "./OrderDetaileContext/order_item_list_context";
import { useManeContext } from "../../components/main_context";
import { RegularButton } from "../../components/buttons/regular_button";
import {ReactComponent as BackIcon} from "../../svg/back_icon.svg"
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"
import '../../styles/popup_mobile.scss'

export function PopupAddCocktailsMenu({add_cicktails_active, setAdd_cocktails_active}){
    // BG%20Lounge/1/orders/98
    let {placeName} = useParams()
    let {placeId} = useParams()
    let {orderId} = useParams()
    let navigate = useNavigate()
    let orderDetaileContext = useOrderItemListContext()
    let menus = orderDetaileContext.getMenusContext
    let order = orderDetaileContext.getOrderContext
    let [menusContentActive,setMenusContentActive] = useState(true)
    let [menuPositionActive,setMenuPositionActive] = useState(false)
    let [addBattonActive,setAddButtonActive] = useState(false)
    let [menuTitleActive, setMenuTitleActive] = useState(true)
    let [positionTitleActive, setPositionTitleActiv] = useState(false)
    let [backButtonActive, setBackButtonActive] = useState(false)

    function renderMenu(menu){
        if(menu.is_current_menu){
            return(
                <div key={menu.id} className='popup_add_cocktails_menus' onClick={openMenuPositions}>
                    <NavLink className='menu_name_link' to={`menu/${menu.id}`}>
                       <RegularButton lable={menu.name}/>
                    </NavLink>  
                </div>
            )   
        }
    }

    function addButton(){
        let itemList = orderDetaileContext.getItemListMobile()
        itemList.map(item =>{
            orderDetaileContext.addItem(item)   
            }
        )
        setAdd_cocktails_active(false)
        openMenuList()
    }

    function openMenuPositions(){
        setMenuTitleActive(false)
        setPositionTitleActiv(true)
        setMenusContentActive(false)
        setMenuPositionActive(true)
        setAddButtonActive(true)
        setBackButtonActive(true)
    }
    function openMenuList(){
        setMenuTitleActive(true)
        setPositionTitleActiv(false)
        setMenusContentActive(true)
        setMenuPositionActive(false)
        setAddButtonActive(false)
        setBackButtonActive(false)
        if(order){
            navigate(`/${placeName}/${placeId}/orders/${orderId}`) 
        }else{
            navigate(`/${placeName}/${placeId}/orders/new_order`)  
        }
        
    }

    function closePopup(){
        setAdd_cocktails_active(false)
        openMenuList()
    }
    return(
        <div className={add_cicktails_active ? 'popup_mobile_wrapper active' : 'popup_mobile_wrapper'} onClick={closePopup}>
            <div className="popup_mobile_content" onClick={e => e.stopPropagation()}>
                
                <div className="service_button_line">
                    <div className="popup_button_wrapper" onClick={openMenuList}>
                        <BackIcon className={backButtonActive?'back_button_icon active':'back_button_icon' }/>
                    </div>
                    <div className="popup_button_wrapper" onClick={closePopup}>
                        <CloseIcon className='close_button_icon'/>
                    </div>   
                </div>
                
                
                
                <div className="popup_title">
                    {console.log('MENUS MOBILE', menus)}
                    <span className={menuTitleActive?'popup_menus_title active':'popup_menus_title'}>Choose menu</span> 
                    <span className={positionTitleActive?'popup_positions_title active':'popup_positions_title'} >Add cocktails</span> 
                </div>

                <div className="popup_content_container">
                    <div className={menuPositionActive?'menu_position_block active':'menu_position_block'}>
                        <OrderDetaileMenuRoute/>      
                    </div>
                    <div className={menusContentActive?"order_detaile_menu_name active":"order_detaile_menu_name"}>
                        {menus.map(menu=>(
                            renderMenu(menu)
                        ))}      
                    </div> 
                    
                     
                </div>

                <div className="popup_footer">
                    <div className={addBattonActive?'add_coctails_button active':'add_coctails_button'}onClick={addButton}><RegularButton lable={'Add Coctails'}/></div>
                </div>
                
                 
            </div>
        </div>
    )
}