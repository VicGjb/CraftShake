import React, {useState,useEffect} from "react";
import { NetworkManager } from "../../components/network_manager";
import {useParams} from 'react-router-dom';
import { useManeContext } from "../../components/main_context";
import { RegularButton } from "../../components/buttons/regular_button";
import { useInvoiceDetaileContext } from "./InvoiceDetileContext";
import { InvoiceDetileButtonRow } from "./InvoiceDetaileButtonRows";
import {ReactComponent as PdfIcon} from "../../svg/pdf_icon.svg"
import { InvoiceOrderTable } from "./InvoiceOrderTabel";
import { DeleteInvoiceButton } from "./InvoiceDetaileButtonRows";
import { Loading } from "../../components/loader";
import '../../styles/invoice_detaile.scss'

export function InvoiceDetaileContent(){
    let invoiceDetaileContext = useInvoiceDetaileContext()
    let network_manager = new NetworkManager()
    let invoice = invoiceDetaileContext.getInvoice
    let [loaded, setLoaded] = useState(false);
    let {invoiceId} = useParams();
    let mainCintext = useManeContext();
    let user = mainCintext.getUserFromMainContext()


    useEffect(() => {
        network_manager.get_invoice_detaile(invoiceId)
            .then(invoice => { 
                invoiceDetaileContext.setInvoice(invoice)
                invoiceDetaileContext.setIsVat(invoice.is_vat)
                setLoaded(true);
            })
            .catch(error=>{
                setLoaded(false)
                //console.log('error', error)
            })
    }, [invoiceId])
    

    function renderVatButton(){

        function removeVat(){
            network_manager.remove_vat(invoice.id)
                .then(invoice=>{
                    invoiceDetaileContext.setInvoice(invoice)
                })
        }
        function addVat(){
            network_manager.add_vat(invoice.id)
                .then(invoice=>{
                    invoiceDetaileContext.setInvoice(invoice)
                })
        }

        if(user.role==='counter'){
            if (invoice.is_vat){
                //console.log('VAT',invoiceDetaileContext.getInvoice.is_vat)
                return(
                    <div className="remove_vat_button_wrapper" onClick={removeVat}>
                        <RegularButton lable={'Remove VAT'}/>
                    </div>
                )
            }else{
                return(
                    <div className="add_vat_button_wrapper" onClick={addVat}>
                        <RegularButton lable={'Add VAT'}/>
                    </div> 
                )
            }
        }  
    }

    function getPDF(){
        let fileDownload = require('js-file-download');
        network_manager.get_invoice_pdf(invoiceId)
        .then(response=>{
            fileDownload(response.data, `Invoice ${invoice.place_name} on ${invoice.date}.pdf`);
            //console.log('RESPONCE PFD', response)
        }
        )
    }
    

    function invoiceView(){
        return(
            <div className="invoice_detaile_wrapper">
                <InvoiceDetileButtonRow/>
                <div className="invoice_detaile_title">
                    <div className="invoice_detaile_title_id">
                        Invoice: #{invoice.id}
                    </div>
                    <div className="invoice_detaile_content_date">
                        {invoice.date.split('-').reverse().join('.')} 
                    </div>
                    <div className="pdf_icon_container" onClick={getPDF}>
                        <PdfIcon className='pdf_icon' /> 
                    </div>
                </div>
                <div className="invoice_detaile_tables_wrapper">
                    <div className="invoice_orders_table">
                        {invoice.orders.map(order=>(
                            <InvoiceOrderTable key={order.id} order={order}/>
                        ))}
                    </div>
                    <div className="invoice_detaile_table_info">
                        {renderVatButton()}
                        <div className="invoice_detaile_table_info_row">
                            <span>Amount:</span>  
                            <span>{invoice.amount} ₪</span> 
                        </div>
                        <div className="invoice_detaile_table_info_row">
                            <span>VAT:</span>
                            <span>{Number(invoice.total_amount-invoice.amount).toFixed(2)} ₪</span> 
                        </div>
                        <div className="invoice_detaile_table_info_row">
                            <span>TOTAL:</span>
                            <span>{invoice.total_amount} ₪</span>
                        </div>
                        
                    </div>
                </div>
                <div className="invoice_detaile_footer">
                    <div className="invoice_detaile_footer_content">
                        <div className="invoice_detaile_footer_buttons">
                            {invoice.state=='Created'?
                            <DeleteInvoiceButton/>
                            :<div></div>
                            }
                            {renderVatButton()}
                        </div>
                        <div className="invoice_detaile_footer_info">
                            <div className="invoice_detaile_table_info_row">
                                <span>VAT:</span>
                                <span>{Number(invoice.total_amount-invoice.amount).toFixed(2)} ₪</span> 
                            </div>
                            <div className="invoice_detaile_table_info_row">
                                <span>TOTAL:</span>
                                <span>{invoice.total_amount} ₪</span>
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
                <Loading/>
            )
        }
    }

    return( 
        Render(loaded)
    )
}