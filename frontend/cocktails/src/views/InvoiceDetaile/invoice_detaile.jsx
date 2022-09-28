import React, {useState,useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useParams} from 'react-router-dom';
import { useManeContext } from "../../components/main_context";
import { RegularButton } from "../../components/buttons/regular_button";
import { PopupDelete } from "../../components/popup/popup_delete";
import { PopupRegularMessage } from "../../components/popup/popup_regular_message";

export function InvoiceDetaile(){
    let {placeId} = useParams();
    let {placeName} = useParams();
    let navigate = useNavigate();
    let [invoice, setInvoice] = useState({});
    let [loaded, setLoaded] = useState(false);
    let {invoiceId} = useParams();
    let main_context= useManeContext();

    let defaultForm = {
        state:'',
        is_vat:false,
    }
    let [form, setForm] = useState(defaultForm);

    
    let [regular_message_active, setRegular_message_active] = useState(false)
    let [delete_active,setDelete_active] = useState(false)

    useEffect(() => {
        axios({
          method: 'GET',
          url: `http://127.0.0.1:8000/api/counter/invoice/${invoiceId}/`
            }).then(response => { 
                setInvoice(response.data);
                setLoaded(true);
                setForm({...form, ['state']:response.data.state, ['is_vat']:response.data.is_vat })
        })
    }, [invoiceId])
    
    function DeleteInvoice(){
        console.log('Order ID', invoice.id)
        if(invoice.state=='No state'){
            axios
            .post(`http://127.0.0.1:8000/api/counter/invoice/delete/${invoice.id}/`)
            .then(response =>{
                console.log('invoice was deleted', response);
            })
            .catch(error=>{
                console.log(error);
                throw error;
            });
            navigate(`/${placeName}/${placeId}/invoices`)
        }else{
            setRegular_message_active(true)
            setDelete_active(false)
        }
        
    }
    
    function changeHendler(e){
        setForm({...form, [e.target.name]:e.target.value})
        console.log('Form',form)
    }
    function VatChangeHendler(e){
        setForm({...form, [e.target.name]:e.target.checked})
        console.log('Form',form)
    }

    function updateInvoice(){
        axios
            .post(`http://127.0.0.1:8000/api/counter/invoice/update/${invoice.id}/`,form)
            .then(response => {
				console.log('UPDATE INVOICE',response);
            })
            .catch(error => {
				console.log(error);
				throw error;
			});
        navigate(`/${placeName}/${placeId}/invoices`)
    }
    
    function stateOptions(){
        if(invoice.state=='No state'){
            return(
                <select  
                    className="invoice_detaile_content_body_status_select regular_text_small"
                    value={form.state}
                    onChange={changeHendler}
                    name='state'
                    >          
                    <option>No state</option>
                    <option>Invoiced</option>
                    <option>Paid</option>
                </select>    
                )
            }else{
                return(
                    <select  
                        className="invoice_detaile_content_body_status_select regular_text_small"
                        value={form.state}
                        onChange={changeHendler}
                        name='state'
                        >          
                        <option>Invoiced</option>
                        <option>Paid</option>
                    </select> 
                )
            }
    }

    function invoiceView(){
        return(
            <div>
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
                                {stateOptions()}

                            <div className="add_invoice_form_date to">
                                <div className="add_invoice_form_date_lable">
                                    VAT:
                                </div>
                                <div>
                                    <input 
                                        className="checkbox_input"
                                        type='checkbox'
                                        name='is_vat'
                                        checked={form.is_vat}
                                        onChange={VatChangeHendler}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="invoice_detaile_content_body_button_set">
                            <div className="invoice_detaile_content_body_button_set_button" onClick={updateInvoice}>
                                <RegularButton lable={'Accept'}/>
                            </div>
                            <div className="invoice_detaile_content_body_button_set_button" onClick={main_context.goBack}>
                                <RegularButton lable={'Back'}/>
                            </div>
                            <div className="invoice_detaile_content_body_button_set_button">
                                <a href={`http://127.0.0.1:8000/api/counter/invoice/create_pdf/${invoiceId}/`}>
                                    <RegularButton lable={'PDF'} />
                                </a>
                            </div>
                            <div className="invoice_detaile_content_body_button_set_button" onClick={()=>setDelete_active(true)}>
                                    <RegularButton lable={'Delete'}/>
                            </div>
                        </div>
                    </div>
                </div>
                <PopupDelete subject={`invoice #${invoice.id} on ${invoice.date}`} delete_active={delete_active} setDelete_active={setDelete_active} func={DeleteInvoice}/>
                <PopupRegularMessage message={"You can't delete this invoice"} regular_message_active={regular_message_active}  setRegular_message_active={setRegular_message_active}/>
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