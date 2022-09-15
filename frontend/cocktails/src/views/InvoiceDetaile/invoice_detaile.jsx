import React, {useEffect,useState} from "react";
import axios from 'axios';
import {useParams,useLocation} from 'react-router-dom';
import { PlaceSubtitle } from "../../components/place_subtitle";
import { RegularButton } from "../../components/buttons/regular_button";
import { Link } from "react-router-dom";

export function InvoiceDetaile(){
    let location=useLocation();
    let {from}=location.state;
    let place = from;

    let [invoice, setInvoice] = useState({});
    let [loaded, setLoaded] = useState(false);
    let {invoiceId} = useParams();
    

    useEffect(() => {
        axios({
          method: 'GET',
          url: `http://127.0.0.1:8000/api/counter/invoice/${invoiceId}/`
            }).then(response => { 
                setInvoice(response.data);
                setLoaded(true);
        })
    }, [invoiceId])
    
    function DeleteInvoice(){
        console.log('Order ID', invoice.id)
        axios
            .post(`http://127.0.0.1:8000/api/counter/invoice/delete/${invoice.id}/`)
            .then(response =>{
                console.log('invoice was deleted', response);
            })
            .catch(error=>{
                console.log(error);
                throw error;
            });
    }


    function invoiceView(){
        return(
            <div>
                <div>
                    <PlaceSubtitle place={place}/>
                </div>
                <div className="invoice_detaile_content">
                    <div className="invoice_detaile_contetnt_title regular_text_small">
                        <div className="invoice_detaile_content_title_id">
                            Invoice: #{invoice.id}
                        </div>
                        <div className="invoice_detaile_content_title_date">
                            {invoice.date}
                        </div>
                    </div>

                    <div className="invoice_detaile_content_body">
                        <div className="invoice_detaile_content_body_orders_table">
                            <div className="invoice_detaile_content_body_orders_table_list">
                                {invoice.orders.map(order=>(
                                    <div className="invoice_detaile_content_body_orders_table_order" key={order.id}>
                                        <div className="invoice_detaile_content_body_orders_table_title regular_text_small">
                                            <div className="invoice_detaile_content_body_orders_table_title_id">
                                                Order ID: #{order.id}   
                                            </div>
                                            <div className="invoice_detaile_content_body_orders_table_title_date">
                                                {order.date}
                                            </div>
                                        </div>

                                        <div className="invoice_detaile_content_body_orders_table_head tr regular_text_small">
                                            <div className="th">Name</div>
                                            <div className="th">QTY</div>
                                            <div className="th">Price</div>
                                        </div>
                                        <div className="invoice_detaile_content_body_orders_table_body">
                                            {order.order_item.map(order_item=>(
                                                <div className="invoice_detaile_content_body_orders_table_body_row tr regular_text_small" key={order_item.id}>
                                                    <div className="th">{order_item.name}</div>
                                                    <div className="th">{order_item.quantity}</div>
                                                    <div className="th">{order_item.item_price}</div>
                                                </div>
                                                )                                           
                                            )}
                                        </div>
                                        <div className="invoice_detaile_content_body_orders_table_body_row_total_price tr regular_text_small">
                                            <div>Total: {order.total_price} </div>  
                                        </div>  
                                    </div>
                                ))}

                            </div>
                           
                            <div className="invoice_detaile_content_body_orders_table_info regular_text_small">
                                <div className="invoice_detaile_content_body_orders_table_info_row">
                                    Amount: {invoice.amount}
                                </div>
                                <div className="invoice_detaile_content_body_orders_table_info_row">
                                    VAT: {Number(invoice.total_amount-invoice.amount).toFixed(2)}
                                </div>
                                <div className="invoice_detaile_content_body_orders_table_info_row">
                                    TOTAL: {invoice.total_amount}
                                </div>
                            </div>

                            
                        </div>
                        
                        <div className="invoice_detaile_content_body_status regular_text_small">
                            Status:
                            <select className="invoice_detaile_content_body_status_select regular_text_small">            
                                <option>Paid</option>
                                <option>Open</option>
                                <option>Close</option>
                            </select>
                        </div>
                        <div className="invoice_detaile_content_body_button_set">
                            <div className="invoice_detaile_content_body_button_set_button">
                                <a href={`http://127.0.0.1:8000/api/counter/invoice/create_pdf/${invoiceId}/`}>
                                    <RegularButton lable={'Print'} />
                                </a>
                            </div>
                            <div className="invoice_detaile_content_body_button_set_button" onClick={DeleteInvoice}>
                                <Link to={{pathname:`/${place.id}/${place.name}/invoices`}} replace state={{from: place}} >
                                    <RegularButton lable={'Delete'}/>
                                </Link>
                            </div>
                            <div className="invoice_detaile_content_body_button_set_button">
                                <RegularButton lable={'Accept'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    function Render(props){
        let isLoaded = props;
        if(isLoaded){
            return invoiceView()
        }else{
            return(
                <div>Loading</div>
            )
        }
    }

    return(
        <div>   
            {Render(loaded)}
        </div>
    )
}