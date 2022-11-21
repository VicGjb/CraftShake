import React from "react";



export function Changer({rows, setRows}){
    let temp = rows

    function onClick(){
        setRows(rows =>[...rows, 'test'])
        console.log('Add row', rows)
    }

    return(
        <div>
            <button onClick={onClick}>
                BUTTTON
            </button>
        </div>
    )
} 