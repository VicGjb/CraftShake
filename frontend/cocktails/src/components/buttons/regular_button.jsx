import React from "react";
import '../../styles/regular_btn.scss'

export const RegularButton = ({lable, type}) => {
    return(
        <button className={`button`} type={type?type:'button'}>
            <div className={`button_label`}>{lable}</div>
        </button>
    )
}