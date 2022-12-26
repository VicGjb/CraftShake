import React, { useEffect, useState } from "react";
import { PlaceCardBtn } from "../../components/buttons/place_card_btn";
import { PopupAddPlace } from "../../components/popup/popup_add_place";
import { NetworkManager } from "../../components/network_manager";
import { useManeContext } from "../../components/main_context";
import { PlaceListMobile } from "./place_list_mobile";
import '../../styles/place_list.scss';
import {ReactComponent as SearchBtn} from "../../svg/search.svg";


export function PlaceList(){
    let [place, setPlace] = useState([]);
    let [loaded, setLoaded] = useState(false)
    let [add_place_active, setAdd_place_active] = useState(false)
    let network_manager = new NetworkManager()
    let main_context =  useManeContext()
    let user = main_context.getUserFromMainContext()
    let newPlace = true

    useEffect(()=> {
        network_manager.get_place_list()
        .then(placeList=>{
            main_context.setPlaces(placeList)
            setPlace(placeList);
            setLoaded(true);
        })
    }, [])
  
    function getPlaceListByName(e){
        if (e.target.value === ''){
            network_manager.get_place_list()
            .then(placeList => {
                main_context.setPlaces(placeList);
                setPlace(placeList);
                })
                return
            }
        network_manager.getPlaceByName(e.target.value)
            .then(placeList=>{
                main_context.setPlaces(placeList);
                setPlace(placeList);
            })
    }


    function PlaceListView(){
        return(
            <div className="place_list_wrapper">
                <div className="greetings">
                    Hello, {user.username}!
                </div>

                <div className="mobile_content">
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
                <PopupAddPlace
                    add_place_active={add_place_active} 
                    setAdd_place_active={setAdd_place_active} 
                    setPlaces={setPlace}
                    newPlace={newPlace}
                    />
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
        Render(loaded) 
    )
}