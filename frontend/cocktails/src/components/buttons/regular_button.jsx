import React from "react";
import '../../styles/regular_btn.scss'

export const RegularButton = ({lable, backround}) => {
    return(
        <button className={`button ${backround}`}>
            <div className={`button_label ${backround}`}>{lable}</div>
        </button>
    )
}