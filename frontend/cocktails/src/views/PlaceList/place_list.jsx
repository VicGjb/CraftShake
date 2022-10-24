import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../components/axios";
import axios from 'axios';
import { PlaceCardBtn } from "../../components/buttons/place_card_btn";
import { AddButton } from "../../components/buttons/add_button";
import { RegularButton } from "../../components/buttons/regular_button";
import { PopupAddPlace } from "../../components/popup/popup_add_place";
import { Logout } from "../Auth/logout";


export function PlaceList(){
    let navigate = useNavigate();
    let [place, setPlace] = useState([]);
    let [loaded, setLoaded] = useState(false)
    let [add_place_active, setAdd_place_active] = useState(false)

    useEffect(()=> {
        axiosInstance
            .get('counter/places/')
            .then(response => {
                setPlace(response.data.results);
                setLoaded(true);
            })
    }, [])
  
    function goBack(){  
        navigate(-1)
    }

    function PlaceListView(){
        return(
        <div className='place_list_wrapper'>
            <div className="place_list">
                <div className="place_list__content">
                    <Logout/>
                    <div className="place_list_button_row" >
                        <div onClick={goBack}>
                            <RegularButton lable={'Back'}/>
                        </div>
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