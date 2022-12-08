import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

let MainContext = React.createContext();

export function useManeContext(){
    return useContext(MainContext)
}

export function MainContextProvider({children}){
    let [sideMenuBurgerActiv, setSideMenuBurgerActiv] = useState(false)
    let navigate = useNavigate();
    let [user, setUser] = useState();
    let [places, setPlaces] = useState([]);
    let [volumes, setVolumes] = useState([]);
    let placeHolderPhoto = 'https://craftshake.s3.eu-central-1.amazonaws.com/Product_photo/cocktailDefault.jpeg'
    
    function goBack(){
        navigate(-1)
    }
    // User info
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
    
    // Photo for product
    function getPhoto(photo){
        if (photo){
            return photo
        }else{
            return placeHolderPhoto
        }

    }


    return(
        <MainContext.Provider value={{
            setSideMenuBurgerActiv:setSideMenuBurgerActiv,
            getSideMenuBurgerActiv:sideMenuBurgerActiv,
            setPlaces:setPlaces,
            getPlaces:places,
            goBack:goBack,
            setUserInMainContext:setUserInContext,
            getUserFromMainContext:getUserFromContext,
            setVolumesInMainContext:setVolumesInContext,
            getVolumesFromMainContext:getVolumesFromContext,
            getVolomeNameFromMainContext:getVolumeNameFromContext,
            getDefaultVolume:getDefaultVolume,
            getPhoto:getPhoto
        }}>
            {children}
        </MainContext.Provider>
    )
}