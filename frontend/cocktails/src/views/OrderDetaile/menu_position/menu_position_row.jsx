import React, { useEffect, useSyncExternalStore } from "react";
import { useState } from "react";
import { InputNumber } from "../../../components/input_number";
import { RegularButton } from "../../../components/buttons/regular_button";
import { useOrderItemListContext } from "../OrderDetaileContext/order_item_list_context";
import { useManeContext } from "../../../components/main_context";

export function MenuPositionRow(props){
    let order_positions = useOrderItemListContext()
    let menu_position = props.position;
    let main_context = useManeContext()
    let defaultForm = {
        order:props.order.id,
        name:menu_position.name,
        quantity:0,    
        position:props.position.id,
        item_price:0,
        new_item:true,
    }
    let [qnty, setQnty] = useState(0);
    let [form, setForm] = useState(defaultForm);
    let [num_value, setNumValue] = useState(0);
    let volumes = main_context.getVolumeFromMainContext()


    function Addbutton(){
        if(form.quantity>0){
            order_positions.add(form);
            order_positions.update_order_positions();
            setNumValue(0);
        }
    }
   
    function calculateTotal(qnty){
        let result = Number(qnty) * Number(menu_position.sale_price);
        setForm({...form, ['item_price']:result.toFixed(2),['quantity']:qnty})
    }

    function ChangeHendler(qnty){
        setQnty(qnty)
        calculateTotal(qnty)
    }

    return(
        <div className="position_row regular_text_small" key={menu_position.id}>
            <div className="position_row_photo">
                <img src={menu_position.photo} alt="" />    
            </div>
            <div className="position_row_slot">
                <div className="position_row_slot_name regular_text_small">{menu_position.name}
                <select name="volume">
                    {volumes.map(volume=>(
                        <option key={volume.id} value={volume.id}>{volume.name}</option>  
                    ))}
                    
                </select>
                </div>
            </div>
            <InputNumber onChange={ChangeHendler}/>
            <div className="button_slot" onClick={Addbutton}><RegularButton lable={'add'}/></div>
        </div>
    )
}