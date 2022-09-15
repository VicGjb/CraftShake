import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AddButton } from "../../components/buttons/add_button";
import { useLocation } from "react-router-dom";
import { PlaceSubtitle } from "../../components/place_subtitle";
import { PopupAddInvoice } from "../../components/popup/popup_add_invoice";
import axios from "axios";

export function InvoiceList(){
    let [invoices, setInvoices] = useState([]);
    let [is_loaded, setIsLoaded] = useState(false);
    let location = useLocation();
    let {from} = location.state;
    let place = from;

    let {placeId} = useParams();

    let[add_invoice_active, setAdd_invoice_active] = useState(false)


    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/counter/invoice/?place=${placeId}`
            }).then(response =>{
                setInvoices(response.data.results)
                setIsLoaded(true)
                console.log('palce',place)
            })
    },[placeId])

    function InvouceListView(){
        return(
            <div>
                <div>
                    <PlaceSubtitle place={place}/>
                </div>
                <div className="invoice_list_content">
                    <div className="invoice_list_content_title regular_text">
                        Invoice                        
                    </div>
                    <div className="invoice_list_content_conteiner">
                        <div className="invoise_list_button_set" onClick={()=>setAdd_invoice_active(true)}>
                            <AddButton lable={'Add invoice'}/>
                        </div>
                        <div className="invoice_list_table regular_text_small">
                            <div className="invoice_list_table_head">
                                <div className="invoice_list_table_head_tr tr">
                                    <div className="th">
                                        ID
                                    </div>
                                    <div className="th">
                                        Date
                                    </div>
                                    <div className="th">
                                        Amount
                                    </div>
                                    <div className="th">
                                        Total
                                    </div>
                                    <div className="th">
                                        State
                                    </div>
                                </div>
                            </div>
                            <div className="invoice_list_table_body">
                                {invoices.map(invoice => (
                                    <Link to={`/invoices/${invoice.id}`} state={{from: place}} key={invoice.id}>
                                        <div className="invoice_list_table_body_tr tr">
                                            <div className="td">{invoice.id}</div>
                                            <div className="td">{invoice.date}</div>
                                            <div className="td">{invoice.amount}</div>
                                            <div className="td">{invoice.total_amount}</div>
                                            <div className="td">State</div>
                                        </div>
                                    </Link>                                      
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <PopupAddInvoice add_invoice_active={add_invoice_active} setAdd_invoice_active={setAdd_invoice_active} place={place}/>
            </div>
        )
    }

    function Render(is_loaded){
        if(is_loaded){
            return(InvouceListView())
        }else{
            return(
                <div>Loaded</div>
            )
        }
    }
    return(
        <div>
            {Render(is_loaded)}   
        </div>
        
    )
}