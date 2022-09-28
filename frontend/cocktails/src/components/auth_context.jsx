import React from "react";
import { useState } from "react";
import { useContext } from "react";

let AuthContext = React.createContext();

export function useAuthContext(){
    return useContext(AuthContext)
}

export function AuthContextProvider({children}){

    let [token, setToken] = useState('');
    
    function setAuth(prop){
        console.log('token', prop.auth_token)
        setToken(prop.auth_token)
    }

    function getAuth(){
        console.log('GGG',token)
        return `Token ${token}`
    }

    return(
        <AuthContext.Provider value={{
            setAuth:setAuth,
            getAuth:getAuth,
        }}>
            {children}
        </AuthContext.Provider>
    )
}