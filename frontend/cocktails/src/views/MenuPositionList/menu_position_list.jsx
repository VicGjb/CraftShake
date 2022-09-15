import React, {useEffect,useState} from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom';

export function MenuPositionList(){
    let [menu, setMenu] = useState([]);
    let [position, setPosition] = useState([]);
    let {menuId} = useParams();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/counter/menu/1/`)
        .then((response) => {setMenu(response.data);
            console.log(response.data)
            return axios.get(`http://127.0.0.1:8000/api/counter/menu-position/?menu=${response.data.id}`);
        })
        .then((response) => {
            setPosition(response.data.results);
            console.log('Response', response.data.results);
            })
        ;},[menuId])
        
    return(
        <div>
            <div>{menu.name}</div>
            {
            position.map(p => (
                   ( <p key={p.id}>{p.name} {p.sale_price}</p>)
                ))
            }
        </div>
    )
}