import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useMainContext } from "../../router/main_context";
import '../../styles/personal_account.scss'

export function PersonalAccount(){
    let {userId} = useParams()
    let navigate = useNavigate()
    let main_context = useMainContext()    
    let user = main_context.getUserFromMainContext()

    useEffect(()=>{
            //console.log('user on personal page',user)
            if (user.place){
                //console.log('place',user.place)
            navigate(`${user.place}/main`)
            }
    },[userId])

    return(
        <div className="personal-accaunt_wrapper">
            <div className="personal-account_message">
            It looks like you are not yet our client or your access was denied. Please contact with our manager.
            </div>
        </div>
    )

}