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
        return user
    }

    // Volumes for order item and menu position
    function setVolumesInContext(param){
        setVolumes(param)
        return
     }
    function getVolumesFromContext(){
        return volumes
    }
    function getVolumeNameFromContext(id){
       return volumes.filter(volume=>(volume.id == id))[0].name
    }
    function getDefaultVolume(){
        console.log('Default', volumes[0].id)
        return volumes[0]
    }



    return(
        <MainContext.Provider value={{
            goBack:goBack,
            setUserInMainContext:setUserInContext,
            getUserFromMainContext:getUserFromContext,
            setVolumesInMainContext:setVolumesInContext,
            getVolumesFromMainContext:getVolumesFromContext,
            getVolomeNameFromMainContext:getVolumeNameFromContext,
            getDefaultVolume:getDefaultVolume,
        }}>
            {children}
        </MainContext.Provider>
    )
}