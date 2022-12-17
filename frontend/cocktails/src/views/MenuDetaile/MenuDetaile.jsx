import React from "react";
import { MenuDetaileContent } from "./MenuDetaileContent";
import { MenuDetaileContextProvider } from "./MenuDetaileContext";
export function MenuDetaile(){

    return(
        <MenuDetaileContextProvider>
            <MenuDetaileContent/>
        </MenuDetaileContextProvider>  
    )
    
}