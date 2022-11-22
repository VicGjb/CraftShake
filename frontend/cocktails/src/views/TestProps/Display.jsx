import React from "react";
import ComboBox from "./autocomplite_test";
import CustomInputAutocomplete from "./autocomplite_test";
export function Display({rows, setRows}){

    return(
        <div>
            Display
            {rows}
            {/* {rows.map(row=>(
                <div>{row}</div>
            ))} */}

            <div>
                <CustomInputAutocomplete/>
            </div>
        </div>
    )

}