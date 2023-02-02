import React from "react";
import { PlaceCardBtn } from "../../components/buttons/place_card_btn";
import { useManeContext } from "../../components/main_context";
import {ReactComponent as SearchBtn} from "../../svg/search.svg"
import { NetworkManager } from "../../components/network_manager";
import '../../styles/place_list_mobile.scss'

export function PlaceListMobile(){
    let mainContext = useManeContext()
    let places = mainContext.getPlaces
    let networkManager = new NetworkManager()
    
    function getPlaceListByName(e){
        //console.log('hey')
        if (e.target.value === ''){
            networkManager.get_place_list()
            .then(places => {
                mainContext.setPlaces(places);
                })
                return
            }
            networkManager.getPlaceByName(e.target.value)
            .then(places=>{
                mainContext.setPlaces(places);
            })
    }

    return(
        <div className="mobile_wrapper">
            <div className="mobile_search_wrapper">
                <input 
                        type="text" 
                        className="mobile_search_input"
                        onChange={getPlaceListByName}
                        />
                <SearchBtn className='mobile_search_icon'/>
            </div>
            <div className="places_table">
                <div className="place_list_cards_buttons">
                            {places.map(p => (
                                        <PlaceCardBtn p={p} key={p.id}/>
                                    ))}    
                </div> 
                {/* <div className="add_place_button"></div>   */}
            </div>
            
            
        </div>
    )
}