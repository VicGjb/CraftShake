import React from "react";
import { useState } from "react";
import { Changer } from "./Changer";
import { Display } from "./Display";

export function MainPage(){
    let[rows, setRows] = useState([]);

    // function setRowMainPage(value){
    //     setRows(value)

    // }

    return(
        <div>
            <Changer rows={rows} setRows={setRows} />
            <div></div>
            <div></div>
            <Display rows={rows} setRows={setRows}/>
            <div></div>

        </div>
    
    )

}