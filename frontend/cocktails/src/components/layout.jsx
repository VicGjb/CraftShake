import React from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "./side_bar/side_bar";
import { MainTitle } from "./main_title";
import { useManeContext } from "./main_context";
import { NetworkManager } from "./network_manager";
import { AuthServise } from "../views/Auth/auth_service";
import { useNavigate } from "react-router-dom";
import { SideBarBurger } from "./side_bar/side_bar_burrger";
import '../styles/layout.scss'


export const Layout = () =>{
    let main_context = useManeContext()
    let navigate = useNavigate()
    let network_manager = new NetworkManager()
    let auth_service = new AuthServise()
    let user = main_context.getUserFromMainContext()
    let refresh_token = localStorage.getItem('refresh_token')


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


            // <div className='wrapper'>
            //         <SideBar/> 
            //     <div className='content'>
            //         <MainTitle/>
            //         <div className='work_space'>
            //             <Outlet></Outlet>
            //         </div>
            //     </div>
            // </div>  
        )
    }

    function renderLayout(){

        if(refresh_token){
            if(user){
                console.log('i have user in layout',user)
                if(user.role_name =='counter'){
                    return(
                        <div>
                            {renderCounterView()} 
                        </div>
                    )
                }else{
                    return(
                        <div>
                            {renderCustomerView()}
                        </div>
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
            }
        }else{
            window.location.href='/login'
        }
    }

    return(
        renderLayout()
    )
}