import React from "react";
import { NetworkManager } from "../../components/network_manager";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AddButton } from "../../components/buttons/add_button";
import { RegularButton } from "../../components/buttons/regular_button";
import { PopupAddInvoice } from "../../components/popup/popup_add_invoice";
import { InvoiceCard } from "./InvoiceCard";
import { InvoiceListTableHead } from "./InvoiceListTableHead";
import { PopupFilters } from "../../components/PopupFilters";
import { useManeContext } from "../../components/main_context";
import '../../styles/invoice_list.scss'


export function InvoiceList(){
    let [invoices, setInvoices] = useState([]);
    let [is_loaded, setIsLoaded] = useState(false);
    let {placeId} = useParams();
    let {placeName} = useParams();
    let network_manager = new NetworkManager()
    let[add_invoice_active, setAdd_invoice_active] = useState(false)
    let [filterActive, setFilterActive] = useState(false)
    let mainContext = useManeContext()
    let user = mainContext.getUserFromMainContext()


    useEffect(()=>{
        network_manager.get_invoice_list(placeId)
            .then(invoices =>{
                    setInvoices(invoices)
                    setIsLoaded(true)
                    
                })
    },[placeId])

    function renderAddInvoiceButton(){
        if (user.role==='counter'){
            return(
                <div className="service_row_button_wrapper add" onClick={()=>{setAdd_invoice_active(true)}}>
                    <AddButton  lable={'Add invoice'} />  
                </div>
            )
        }
    }

    function InvouceListView(){
        return(
                <div className="invoice_list_wrapper">  
                    <div className="service_button_row">
                        <div className="service_row_button_wrapper back" >
                            <Link to={`/${placeName}/${placeId}/detaile`}>
                                <RegularButton lable={'Back'}/>
                            </Link>
                        </div>
                        <div className="service_row_button_wrapper filter" onClick={()=>{setFilterActive(true)}}>
                                <AddButton  lable={'Filters'} />   
                        </div>
                        {renderAddInvoiceButton()}
                        
                    </div>


                    <div className="invoices_table">
                        <InvoiceListTableHead/> 
                        {invoices.map(invoice => (
                            <Link to={`/${placeName}/${placeId}/invoices/${invoice.id}`} key={invoice.id}>
                                <InvoiceCard invoice={invoice}/>
                            </Link>                                      
                        ))}
                    </div> 
                    <PopupAddInvoice
                        add_invoice_active={add_invoice_active} 
                        setAdd_invoice_active={setAdd_invoice_active}
                        setInvoices={setInvoices}
                        />
                    <PopupFilters filterActive={filterActive} setFilterActive={setFilterActive} subject={'invoices'} setSubject={setInvoices}/>
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
        Render(is_loaded)  
    )
}