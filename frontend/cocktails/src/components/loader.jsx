import React from "react";
import {ReactComponent as Logo} from "../svg/logo.svg"
import { useState } from "react";
import { useEffect } from "react";
import '../styles/loading.scss'
export function Loading(){

    let [ready, setReady] = useState(false)
    useEffect(()=>{
        let timer = setTimeout(() => {
            setReady(true);
          }, 1000);
          return () => clearTimeout(timer);
    })

    function loadingView(ready){
        if (ready){
            return(
                <div className='loading_wrapper'>
                    <Logo className='logo_icon'></Logo>
                    <div className="loading_label">
                        Loading . . . 
                    </div>
                </div>
            )
        }else{
            return(<></>)
        }
        
    }

    return(
        loadingView(ready)
    )
}