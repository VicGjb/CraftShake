import React from "react";

export const RegularButton = ({lable}) => {
    return(
        <button className="button">
            <div className="button_label">{lable}</div>
        </button>
    )
}