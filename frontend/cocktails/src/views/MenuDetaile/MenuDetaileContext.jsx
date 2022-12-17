import { positions } from "@mui/system";
import React from "react";
import { useContext } from "react";
import { useState } from "react";


let MenuDetaileContext = React.createContext();

export function useMenuDetaileContext(){
    return useContext (MenuDetaileContext)
}

export function MenuDetaileContextProvider({children}){
    let [menu,setMenu] = useState();
    let [menuPositions, setMenuPositions] = useState([])

    function removeMenuPosition(menuPosition){
        setMenuPositions(menuPositions.filter(position=>position.id!==menuPosition.id))
    }
    function addMenuPosition(menuPosition){
        setMenuPositions(menuPositions => [...menuPositions, menuPosition])
    }

    return(
        <MenuDetaileContext.Provider value={{
            setMenu:setMenu,
            getMenu:menu,
            setMenuPositions:setMenuPositions,
            getMenuPositions:menuPositions,
            removeMenuPosition:removeMenuPosition,
            addMenuPosition:addMenuPosition,
        }}>
            {children}
        </MenuDetaileContext.Provider>
    )
}