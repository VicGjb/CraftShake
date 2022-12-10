import React from "react";
import {ReactComponent as Cross} from "../../svg/cross.svg";

export const AddButton = ({lable}) => {
    return(
        <button className="button">
            <div className="button_label">{lable}</div>
            {/* <Cross className='add_button_cross'></Cross> */}
        </button>
    )
}