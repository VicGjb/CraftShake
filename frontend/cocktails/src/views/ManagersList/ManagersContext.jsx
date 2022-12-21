import React from "react";
import {useContext} from 'react';
import {useState} from 'react' 


let ManagersContext = React.createContext();

export function useManagersContext(){
    return useContext (ManagersContext)
}

export function ManagersContextProvider({children}){
    let [managers, setManagers] = useState([]);

    return(
        <ManagersContext.Provider value={{
            setManagersList:setManagers,
            getManagersList:managers,
        }}>
            {children}
        </ManagersContext.Provider>
    )

}