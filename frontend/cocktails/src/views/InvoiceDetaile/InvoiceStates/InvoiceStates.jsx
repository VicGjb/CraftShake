import React from "react"
import { useState } from "react"
import { RegularButton } from "../../../components/buttons/regular_button"
import { NetworkManager } from "../../../components/network_manager"
import { PopupRegularMessage } from "../../../components/popup/popup_regular_message"
import { useInvoiceDetaileContext } from "../InvoiceDetileContext"
import '../../../styles/order_states.scss'

export function InvoiceStates(){
    let [regular_message_active, setRegular_message_active] = useState(false);
    let networkManager = new NetworkManager()
    let invoiceDetaileContext = useInvoiceDetaileContext()
    let invoice = invoiceDetaileContext.getInvoice


    function setInvoiceInvoiced(){
        networkManager.set_invoice_invoiced(invoice.id)
            .then(invoice=>{
                invoiceDetaileContext.setInvoice(invoice)
            })
    }


    function setInvoicePaid(){
        networkManager.set_invoice_paid(invoice.id)
            .then(invoice=>{
                invoiceDetaileContext.setInvoice(invoice)
            })
    }
    

    function renderStateButton(){
        if (invoice){
            switch (invoice.state){
                case 'Created':
                    return(
                        <div onClick={setInvoiceInvoiced} className='appruve_btn'>
                            <RegularButton lable={'Set invoiced'}/>
                        </div>
                    )
                case 'Invoiced':
                    return(
                        <div>
                            <div className='appruve_btn' onClick={setInvoicePaid}>
                                <RegularButton lable={'Set paid'}/>
                            </div>
                        </div>
                    )
                case 'Paid':
                    return(
                        <div className="paid_state">
                            Paid
                        </div>
                    )
            }
        }
    }

    return(
            renderStateButton(invoice)
    )


}