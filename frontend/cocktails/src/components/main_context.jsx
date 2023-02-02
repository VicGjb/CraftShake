import React, { useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";

let MainContext = React.createContext();

export function useManeContext(){
    return useContext(MainContext)
}

export function MainContextProvider({children}){
    let {placeName} = useParams();
    let {placeId} = useParams();
    let [sideMenuBurgerActiv, setSideMenuBurgerActiv] = useState(false)
    let [backFromCreateOrderUrl, setBackFromCreateOrderUrl]= useState(`/${placeName}/${placeId}/orders`)
    let [user, setUser] = useState();
    let [isLoggedIn, setIsLoggedIn] = useState();
    let [places, setPlaces] = useState([]);
    let [place,setPlace] = useState({})
    let [volumes, setVolumes] = useState([]);
    let placeHolderPhoto = 'https://craftshake.s3.eu-central-1.amazonaws.com/Product_photo/cocktailDefault.jpeg'
    
    function goBack(){
        //console.log('-1')
    }


    // User info
    function setUserInContext(param){
       setUser(param)
       return
    }
    function getUserFromContext(){
        return user
    }
    function getIsLoggedIn(){
        return isLoggedIn
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
        //console.log('Default', volumes[1].id)
        return volumes[1]
    }
    
    // Photo for product
    function getPhoto(photo){
        if (photo){
            return photo
        }else{
            return placeHolderPhoto
        }
    }

    // Place for place detaile


    return(
        <MainContext.Provider value={{
            setSideMenuBurgerActiv:setSideMenuBurgerActiv,
            getSideMenuBurgerActiv:sideMenuBurgerActiv,
            setPlaces:setPlaces,
            getPlaces:places,
            setPlace:setPlace,
            getPlace:place,
            goBack:goBack,
            isLoggedIn:isLoggedIn,
            setIsLoggedIn:setIsLoggedIn,
            setOrderBackUrl:setBackFromCreateOrderUrl,
            getOrderBackUrl:backFromCreateOrderUrl,
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