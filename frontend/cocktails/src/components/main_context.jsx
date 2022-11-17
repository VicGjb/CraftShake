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
    let [volumes, setVolumes] = useState([]);
    function goBack(){
        navigate(-1)
    }
    function setUserInContext(param){
       setUser(param)
       return
    }
    function getUserFromContext(){
        console.log('dddddd',user)
        return user
    }
    
    function setVolumesInContext(param){
        setVolumes(param)
        return
     }
    function getVolumeFromContext(){
        return volumes
    }


    return(
        <MainContext.Provider value={{
            goBack:goBack,
            setUserInMainContext:setUserInContext,
            getUserFromMainContext:getUserFromContext,
            setVolumesInMainContext:setVolumesInContext,
            getVolumeFromMainContext:getVolumeFromContext,
        }}>
            {children}
        </MainContext.Provider>
    )
}