import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "./side_bar/side_bar";
import { MainTitle } from "./main_title";
import { useManeContext } from "./main_context";
import { NetworkManager } from "./network_manager";
import { AuthServise } from "../views/Auth/auth_service";
import { useNavigate } from "react-router-dom";
import { SideBarBurger } from "./side_bar/side_bar_burrger";
import { PopupRegularMessage } from "./popup/popup_regular_message";
import '../styles/layout.scss'


export const Layout = () =>{
    let main_context = useManeContext()
    let navigate = useNavigate()
    let network_manager = new NetworkManager()
    let auth_service = new AuthServise()
    let user = main_context.getUserFromMainContext()
    let refresh_token = localStorage.getItem('refresh_token')
    let [regular_message_active, setRegular_message_active] = useState(false)
    let [fatalError, setFatalError] = useState(false)

    function renderFatalErrorView(){
        return(
            <div className="fatal_error">
              Sorry, the service is temporarily unavailable, we are already working on this problem, come back later...  
            </div>
        )
    }


    function renderCounterView(){
        return(
            <div className="main_wrapper">
                <div className="wrapper">
                    <div className="title">
                        <MainTitle/>
                    </div>
                    <div className="content">
                        <div className="side_bar_wrap">
                            <SideBarBurger/>
                            <SideBar/> 
                        </div>
                        <div className="work_space">
                            <Outlet></Outlet> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function renderCustomerView(){
        return(

            <div className="main_wrapper">
                <div className="wrapper">
                    <div className="title">
                        <MainTitle/>
                    </div>
                    <div className="content">
                        <div className="side_bar_wrap">
                            <SideBarBurger/>
                            <SideBar/> 
                        </div>
                        <div className="work_space">
                            <Outlet></Outlet> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function renderLayout(){
        if (fatalError){
            return(
                renderFatalErrorView()
            )
        }else if(refresh_token){
            if(user){
                console.log('i have user in layout',user)
                if(user.role =='counter'){
                    return(
                        renderCounterView()
                    )
                }else{
                    return(
                        renderCustomerView()
                    )
                }
            }else{
                console.log('No User in Layout')
                let userId = auth_service.GetAccessTokenData().user_id
                network_manager.GetConfig(userId)
                .then(response =>{
                    console.log('Got user in layout',response.volumes)
                    main_context.setUserInMainContext(response.user)
                    main_context.setVolumesInMainContext(response.volumes)
                    }
                )
                .catch(error=>{
                    console.log('error',error)
                    setFatalError(true)
                    throw error;
                    // let fatalError = document.getElementById("fatal_error")
                    // fatalError.innerHTML = 'Sorry, the service is temporarily unavailable, we are already working on this problem, come back later...'
                })
            }
        }else{
            window.location.href='/login'
        }
    }

    return(
        renderLayout()
    )
}