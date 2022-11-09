import React from "react";
import { NetworkManager } from "../../components/network_manager";
import { useState, useEffect } from "react";
import { useManeContext} from "../../components/main_context";
import { Link, useParams } from "react-router-dom";
import { AddButton } from "../../components/buttons/add_button";
import { RegularButton } from "../../components/buttons/regular_button";
import { PopupAddInvoice } from "../../components/popup/popup_add_invoice";
import { InvoiceListState } from "./invoice_list_state";

export function InvoiceList(){
    let [invoices, setInvoices] = useState([]);
    let [is_loaded, setIsLoaded] = useState(false);
    let {placeId} = useParams();
    let {placeName} = useParams();
    let main_context = useManeContext();
    let network_manager = new NetworkManager()
    let defaultForm = {
        date_from: '',
        date_to:'',
        place: {placeId}
    }
    let [form, setForm] = useState(defaultForm);
    let[add_invoice_active, setAdd_invoice_active] = useState(false)


    useEffect(()=>{
        network_manager.get_invoice_list(placeId)
            .then(invoices =>{
                    setInvoices(invoices)
                    setIsLoaded(true)
                    
                })
    },[placeId])


    let changeHandler = e =>{
        setForm({...form, [e.target.name]:e.target.value, ['place']:placeId});
    }
    function SearchInvoice(e){
        e.preventDefault()
        network_manager.search_invoice(placeId, form.date_from, form.date_to)
            .then(invoices =>{
                setInvoices(invoices);
                console.log('res',invoices)
            })
    }

    function InvouceListView(){
        return(
            <div>
                <div className="invoice_list_content">
                    <div className="invoice_list_content_title regular_text">
                        Invoice                        
                    </div>
                    <div className="invoice_list_content_conteiner">
                        <div className="managers_list_content__conteiner___button_set">
                            <div className="invoise_list_button_set" onClick={main_context.goBack}>
                                <RegularButton lable={'Back'}/>
                            </div>
                            <div className="invoise_list_button_set" onClick={()=>setAdd_invoice_active(true)}>
                                <AddButton lable={'Add invoice'}/>
                            </div>
                        </div>
                        <div className="invoice_list_table_search">
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
                                        <Link to={`/${placeName}/${placeId}/invoices/${invoice.id}`} key={invoice.id}>
                                            <div className="invoice_list_table_body_tr tr">
                                                <div className="td">{invoice.id}</div>
                                                <div className="td">{invoice.date}</div>
                                                <div className="td">{invoice.amount}</div>
                                                <div className="td">{invoice.total_amount}</div>
                                                <div className="td"><InvoiceListState invoice={invoice}/></div>
                                            </div>
                                        </Link>                                      
                                    ))}
                                  </div>
                            </div>
                            <div className="order_list_button_set">
                                <div className="title regular_text_small">Search</div>
                                <form onSubmit={SearchInvoice} className='add_order_form'>
                                    <div className="add_order_popup_date">
                                        <div className="date_lable regular_text_small">
                                            From
                                        </div>
                                        <div>
                                            <input
                                                className="date_input"
                                                type='date'
                                                name='date_from'
                                                onChange={changeHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className="add_order_popup_date">   
                                        <div className="date_lable">
                                            To
                                        </div>
                                        <div>
                                            <input
                                                className="date_input"
                                                type='date'
                                                name='date_to'
                                                onChange={changeHandler}
                                            />
                                        </div>
                                    </div>
                                    <div type="submit">
                                        <RegularButton lable={'Search'}></RegularButton>
                                    </div>               
                                </form>           
                            </div>        
                        </div>

                    </div>
                </div>
                <PopupAddInvoice add_invoice_active={add_invoice_active} setAdd_invoice_active={setAdd_invoice_active}/>
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