import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid'; 
import { InputNumber } from "../../../components/input_number";
import { RegularButton } from "../../../components/buttons/regular_button";
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context";
import { useManeContext } from "../../../components/main_context";
import { SelectVolume } from "../../../components/select_volume";

export function MenuPositionRow({position}){

    let menu_position = position;
    let main_context = useManeContext();
    let volumes = main_context.getVolumesFromMainContext();
    let order_detile_context = useOrderItemListContext();
    let orderId = order_detile_context.getOrderIdContext
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


    function Addbutton(){
            let amount_volume = Number(form['quantity']) * Number(volumes.filter(volume=>(volume.id == form['volume']))[0].value)
            let item_price = amount_volume/Number(menu_position.volume) * Number(menu_position.sale_price)
            form.item_price = item_price.toFixed(2)
            if(form.quantity>0){
                order_detile_context.addItem(form)
                setForm({...form, ['uuid']:uuidv4()})
            }
    }

    function ChangeHendler(qnty){
        setForm({...form, ['quantity']:qnty})   
    }

    function changeVolumeHandler(prop){
        setForm({...form, ['volume']:prop.id})
    }

    return(
        <div className="position_row regular_text_small" key={menu_position.id}>
            <div className="position_row_photo">
                <img src={main_context.getPhoto(menu_position.photo)} alt="" />    
            </div>
            <div className="position_row_slot">
                <div className="position_row_slot_name regular_text_small">{menu_position.name}
                <SelectVolume onChange={changeVolumeHandler} />
                </div>
            </div>
            <InputNumber onChange={ChangeHendler} name='qnty'/>
            <div className="button_slot" onClick={Addbutton}><RegularButton lable={'add'}/></div>
        </div>
    )
}