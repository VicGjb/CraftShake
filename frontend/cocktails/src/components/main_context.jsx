import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

let MainContext = React.createContext();

export function useManeContext(){
    return useContext(MainContext)
}

export function MainContextProvider({children}){
    let navigate = useNavigate();

    function goBack(){
        navigate(-1)
    }

    return(
        <MainContext.Provider value={{
            goBack:goBack,
        }}>
            {children}
        </MainContext.Provider>
    )
}