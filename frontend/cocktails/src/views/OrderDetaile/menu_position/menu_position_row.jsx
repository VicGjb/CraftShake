import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid'; 
import { InputNumber } from "../../../components/input_number";
import { RegularButton } from "../../../components/buttons/regular_button";
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context";
import { useMainContext } from "../../../router/main_context";
import { SelectVolume } from "../../../components/select_volume";
import '../../../styles/menu_position_row.scss'

export function MenuPositionRow({position}){

    let menu_position = position;
    let main_context = useMainContext();
    let volume_list = main_context.getVolumesFromMainContext();
    let order_detile_context = useOrderItemListContext();
    
    let orderId = order_detile_context.getOrderIdContext
    
    let [windowWidth, setWindowWidth] = useState(window.innerWidth)
    let defaultForm = {
        uuid:uuidv4(),
        order:orderId,
        name:menu_position.name,
        quantity:1,    
        volume:main_context.getDefaultVolume().id,
        position:position.id,
        new_item:true,
    };
    let [form, setForm] = useState(defaultForm);



    function AddButton(){
            let amount_volume = Number(form['quantity']) * Number(volume_list.filter(volume=>(volume.id == form['volume']))[0].value)
            let item_price = amount_volume/Number(menu_position.volume) * Number(menu_position.sale_price)
            form.item_price = item_price.toFixed(2)
            if(form.quantity>0){
                //console.log('form',form)
                order_detile_context.addItem(form)
                setForm({...form, ['uuid']:uuidv4()})
            }
    }

    function ChangeHendler(qnty){
        form.quantity = qnty
        order_detile_context.addItemMobile(form)
        let amount_volume = Number(form['quantity']) * Number(volume_list.filter(volume=>(volume.id == form['volume']))[0].value)
        let item_price = amount_volume/Number(menu_position.volume) * Number(menu_position.sale_price)
        form.item_price = item_price.toFixed(2)
        setForm({...form, ['quantity']:qnty, ['uuid']:uuidv4()})
        
    }

    function changeVolumeHandler(prop){
        form.volume = prop.id
        order_detile_context.addItemMobile(form)
        let amount_volume = Number(form['quantity']) * Number(volume_list.filter(volume=>(volume.id == form['volume']))[0].value)
        let item_price = amount_volume/Number(menu_position.volume) * Number(menu_position.sale_price)
        form.item_price = item_price.toFixed(2)
        setForm({...form, ['volume']:prop.id,['uuid']:uuidv4() })
    }



    useEffect(()=>{
        function handleResize() {
                setWindowWidth(window.innerWidth)
            }
        window.addEventListener('resize', handleResize)
        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })
    useEffect(()=>{
        //console.log('RESIZE')
        if(window.innerWidth < 990){
            setForm({...form, ['quantity']:0})
            }
        else{ 
            setForm({...form, ['quantity']:1})
        }
    },[windowWidth])

    return(
        <div className="menu_position_row_wrapper" key={menu_position.id}>
            <div className="position_row_photo">
                <img src={main_context.getPhoto(menu_position.photo)} alt="" />    
            </div>
            <div className="position_row_slot">
                <div className="position_row_slot_name">
                    {menu_position.name}
                </div>
                <SelectVolume onChange={changeVolumeHandler} />
            </div>
            <InputNumber onChange={ChangeHendler} name='qnty'/>
            <div className="button_slot" onClick={AddButton}><RegularButton lable={'add'}/></div>
        </div>
    )
}