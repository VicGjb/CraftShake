import React from "react";

export const RegularButton = ({lable, backround}) => {
    return(
        <button className={`button ${backround}`}>
            <div className={`button_label ${backround}`}>{lable}</div>
        </button>
    )
}