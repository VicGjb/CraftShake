import React, { useEffect, useState } from "react";
import axios from 'axios';
import { PlaceCardBtn } from "../../components/buttons/place_card_btn";
import { AddButton } from "../../components/buttons/add_button";
import { PopupAddPlace } from "../../components/popup/popup_add_place";


export function PlaceList(){
    let [place, setPlace] = useState([]);
    let [loaded, setLoaded] = useState(false)

    let [add_place_active, setAdd_place_active] = useState(false)

    useEffect(()=> {
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/counter/places/'
        }).then(response => {
            setPlace(response.data.results);
            setLoaded(true);
        })
    }, [])

    function PlaceListView(){
        return(
        <div className='place_list_wrapper'>
            <div className="place_list">
                <div className="place_list__content">
                    <div className="place_list_button_row" >
                        <div onClick={()=>setAdd_place_active(true)}> 
                          <AddButton lable={'Add place'}/>  
                        </div>
                        
                    </div>
                    <div className="place_list_cards_buttons">
                        {place.map(p => (
                                    <PlaceCardBtn p={p} key={p.id}/>
                                ))}    
                    </div>
                </div>            
            </div>   
            <PopupAddPlace add_place_active={add_place_active} setAdd_place_active={setAdd_place_active} />
        </div>       
        )
    }

    function Render(props){
        let isLoaded = props;
        console.log(isLoaded)
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