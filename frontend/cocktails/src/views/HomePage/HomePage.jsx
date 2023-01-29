import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useManeContext } from "../../components/main_context";
import { Loading } from "../../components/loader";

export function HomePage(){
    let mainContext = useManeContext()
    let access_token = localStorage.getItem('access_token')
    let [user, setUser] = useState({})
    let [isLoaded, setIsLoaded] = useState(false)

    useEffect(()=>{
        if(access_token){
            let userId = auth_service.GetAccessTokenData().user_id
            network_manager.GetConfig(userId)
                .then((response)=>{
                    setUser(user)
                    mainContext.setUserInMainContext(response.user)
                    mainContext.setVolumesInMainContext(response.volumes)
                    setIsLoaded(true)
                })
                .catch(error =>{
                    console.log('errorHomePage',error)
                    throw error;
                })
            }
        },[])
    
    function redirect(){
        if(!user){
            navigate('/login')
        }else if(user.role === 'counter'){
            navigate(`/placeList/`)
        }else if(user.role == 'customer'){
            navigate(`/customer/${user.id}/`)
        }
    }

    function render(isLoaded){
        if(isLoaded){
            return redirect()
        }else{
            return <Loading/>
        }
    }
    
    return(
        render(isLoaded)
    )

}