import React from "react";
import '../../styles/regular_btn.scss'

export const RegularButton = ({lable}) => {
    return(
        <button className={`button`}>
            <div className={`button_label`}>{lable}</div>
        </button>
    )
}