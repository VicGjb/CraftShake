import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

let MainContext = React.createContext();

export function useManeContext(){
    return useContext(MainContext)
}

export function MainContextProvider({children}){
    let navigate = useNavigate();
    let [user, setUser] = useState();
    function goBack(){
        navigate(-1)
    }
    function a(b){
       setUser(b)
       return
    }
    function c(){
        console.log('dddddd',user)
        return user
    }


    return(
        <MainContext.Provider value={{
            goBack:goBack,
            setUserInMainContext:a,
            getUserFromMainContext:user,
        }}>
            {children}
        </MainContext.Provider>
    )
}