import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { PlaceCardBtn } from "../../components/buttons/place_card_btn";
import { PopupAddPlace } from "../../components/popup/popup_add_place";
import { NetworkManager } from "../../components/network_manager";
import { useManeContext } from "../../components/main_context";
import { SideBarPlaceBtn } from "../../components/side_bar/side_bar_place_btn";
import { SideBarProductBtn } from "../../components/side_bar/side_bar_product_btn";
import { MobileRoute } from "./mobile_router";
import { PlaceListMobile } from "./place_list_mobile";
import '../../styles/place_list.scss';
import {ReactComponent as SearchBtn} from "../../svg/search.svg";


export function PlaceList(){
    let navigate = useNavigate();
    let [place, setPlace] = useState([]);
    let [loaded, setLoaded] = useState(false)
    let [add_place_active, setAdd_place_active] = useState(false)
    // let [windowWidth, setWindowWidth] = useState(window.innerWidth)
    let network_manager = new NetworkManager()
    let main_context =  useManeContext()
    let user = main_context.getUserFromMainContext()


    useEffect(()=> {
        network_manager.get_place_list()
        .then(place=>{
            main_context.setPlaces(place)
            setPlace(place);
            setLoaded(true);
        })
    }, [])

    // useEffect(()=>{
    //     function handleResize() {
    //             setWindowWidth(window.innerWidth)
    //         }
    //     window.addEventListener('resize', handleResize)
    //     return _ => {
    //         window.removeEventListener('resize', handleResize)
    //     }
    // })
    // useEffect(()=>{
    //     console.log('RESIZE')
    //     if(window.innerWidth < 769){
    //         navigate('/placeList/placeListMobile')
    //         }
    //     else{
    //         navigate('/placeList') 
    //     }
    // },[windowWidth])

    // function renderNavigationMobile(){
    //     return(
    //         <div className="mobile_nav_btn_wrapper">
    //             <NavLink className='regular_text_small mobile_nav_btn' to={`placeListMobile`}>
    //                 <SideBarPlaceBtn/>
    //             </NavLink>  
    //             <NavLink className='regular_text_small mobile_nav_btn' to={`productListMobile`}>
    //                 <SideBarProductBtn/>
    //             </NavLink>  
    //         </div>
    //     )
    // }
    
    function getPlaceListByName(e){
        console.log('hey')
        if (e.target.value === ''){
            network_manager.get_place_list()
            .then(places => {
                main_context.setPlaces(places);
                setPlace(places);
                })
                return
            }
        network_manager.getPlaceByName(e.target.value)
            .then(places=>{
                main_context.setPlaces(places);
                setPlace(places);
            })
    }


    function PlaceListView(){
        return(
            <div className="place_list_wrapper">
                <div className="greetings">
                    Hello, {user.username}!
                </div>

                <div className="mobile_content">
                    {/* {renderNavigationMobile()}
                    <MobileRoute/> */}
                    <PlaceListMobile/>
                </div>

                <div className="monitor_content">
                    <div className="search_wrapper">
                        <input 
                                type="text" 
                                className="search_input"
                                onChange={getPlaceListByName}
                                />
                        <SearchBtn className='search_icon'/>
                    </div>
                    <div className="place_list_cards_buttons">
                        {place.map(p => (
                                    <PlaceCardBtn p={p} key={p.id}/>
                                ))}    
                    </div>
                </div>
                    
                <div className="add_place_button" onClick={()=>{setAdd_place_active(true)}}></div>  
                <PopupAddPlace add_place_active={add_place_active} setAdd_place_active={setAdd_place_active} />
             
            </div>
   
                    
        )
    }

    function Render(props){
        let isLoaded = props;
        if(isLoaded){
            return PlaceListView()
        } else {
            return(
                <div>Loading</div>
            )
        }
    }

    return (
        <div>
            {Render(loaded)}
        </div>
    )
}