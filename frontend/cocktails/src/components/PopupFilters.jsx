import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { NetworkManager } from "./network_manager";
import { RegularButton } from "./buttons/regular_button";
import {ReactComponent as CloseIcon} from "../svg/close_icon.svg"
import '../styles/popup_filters.scss'

export function PopupFilters({
    filterActive, 
    setFilterActive, 
    subject,
    setSubject,
}){
    let networkManager = new NetworkManager()
    let {placeId} = useParams();
    let defaultForm = {
        date_from: '',
        date_to:'',
        place: {placeId}
    }
    let [form, setForm] = useState(defaultForm);

    function filetrSubject(e){
        e.preventDefault()
        switch(subject){
            case 'orders':
                networkManager.search_order(placeId, form.date_from, form.date_to)
                .then(orders =>{
                        setSubject(orders);
                        console.log('Orders',orders)
                    })
                setFilterActive(false)
                break
            
            case 'invoices':
                e.preventDefault()
                networkManager.search_invoice(placeId, form.date_from, form.date_to)
                    .then(invoices =>{
                        setSubject(invoices);
                        console.log('res',invoices)
                    })
                setFilterActive(false)
                break
        }
    }

    let changeHandler = e =>{
        setForm({...form, [e.target.name]:e.target.value, ['place']:placeId});
    }


    function renderTitle(){
        switch(subject){
            case 'orders':
                return(
                    <span>Filters</span>
                )
                break
            case 'invoices':
                return(
                    <span>Applye</span>
                )
                break
        }
    
    }
    return(
        <div className={filterActive ? 'popup_mobile_wrapper active' : 'popup_mobile_wrapper'} onClick={()=>{setFilterActive(false)}}>
            <div className="popup_mobile_content__filter_order" onClick={e => e.stopPropagation()}>  
                <div className="popup_filter_sevice_button_wrapper">
                    <div className="popup_filter_close_button" onClick={()=>{setFilterActive(false)}}>
                        <CloseIcon className='close_button_icon'/>
                    </div>  
                </div>       
                
                <div className="popup_title">
                    {renderTitle()}
                </div>
                <div className="popup_content_container__filter_order">
                    <form onSubmit={filetrSubject} className='order_list_search_wrapper'>
                        <div className="order_list_search_inputs_wrapper">
                            <div className="date_wrapper">
                                <div className="date_lable">
                                    From:
                                </div>
                                <div className="filter_date_wrap">
                                    <input
                                        className="date_input"
                                        type='date'
                                        name='date_from'
                                        onChange={changeHandler}
                                    />
                                </div>
                            </div>
                            <div className="date_wrapper">   
                                <div className="date_lable">
                                    To:
                                </div>
                                <div className="filter_date_wrap">
                                    <input
                                        className="date_input"
                                        type='date'
                                        name='date_to'
                                        onChange={changeHandler}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="order_list_search_button" type="submit">
                            <RegularButton lable={'Apply'}></RegularButton>
                        </div>               
                    </form>   
                </div>        
            </div>
        </div>
    )

}