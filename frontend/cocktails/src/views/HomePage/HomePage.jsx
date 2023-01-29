import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useManeContext } from "../../components/main_context";
import { Loading } from "../../components/loader";
import { AuthServise } from "../Auth/auth_service";
import { NetworkManager } from "../../components/network_manager";

export function HomePage(){
    let mainContext = useManeContext()
    let access_token = localStorage.getItem('access_token')
    // let [user, setUser] = useState()
    // let [isLoaded, setIsLoaded] = useState(false)
    let navigate = useNavigate()
    let authServise = new AuthServise()
    let networkManager = new NetworkManager()
    let user = mainContext.getUserFromMainContext()

    useEffect(()=>{
        console.log('Hello im on the HomePage')
        // setIsLoaded(true)
        if(!user){
            return navigate('/login')
        }else if(user.role === 'counter'){
            return navigate(`/placeList/`)
        }else if(user.role == 'customer'){
            return navigate(`/customer/${user.id}/`)
        }
        // if(access_token){
        //     console.log('I have Access toket on HomePage')
        //     let userId = authServise.GetAccessTokenData().user_id
        //     networkManager.GetConfig(userId)
        //         .then((response)=>{
        //             setUser(response.user)
        //             mainContext.setUserInMainContext(response.user)
        //             mainContext.setVolumesInMainContext(response.volumes)
        //             setIsLoaded(true)
        //         })
        //         .catch(error =>{
        //             console.log('errorHomePage',error)
        //             throw error;
        //         })
        //     }
        },[])
    
    // function redirect(){
    //     console.log('im in redirect function')
    //     console.log('user in redirect function',user)
    //     if(!user){
    //         return navigate('/login')
    //     }else if(user.role === 'counter'){
    //         return navigate(`/placeList/`)
    //     }else if(user.role == 'customer'){
    //         return navigate(`/customer/${user.id}/`)
    //     }
    // }

    // function render(isLoaded){
    //     if(isLoaded){
    //         return redirect()
    //     }else{
    //         return <Loading/>
    //     }
    // }
    
    // return(
    //     render(true)
    // )

}