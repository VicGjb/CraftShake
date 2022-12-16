import React from "react"
import { useState } from "react"
import { RegularButton } from "../../../components/buttons/regular_button"
import { NetworkManager } from "../../../components/network_manager"
import { PopupRegularMessage } from "../../../components/popup/popup_regular_message"
import { PopupYesNoQuestion } from "./PopupYesNoQuestion"
import { useInvoiceDetaileContext } from "../InvoiceDetileContext"
import '../../../styles/order_states.scss'

export function InvoiceStates(){
    let [regular_message_active, setRegular_message_active] = useState(false);
    let [yesNoQuestionActive, setYesNoQuestionActive] = useState(false)
    let networkManager = new NetworkManager()
    let invoiceDetaileContext = useInvoiceDetaileContext()
    let invoice = invoiceDetaileContext.getInvoice


    function setInvoiceInvoiced(){
        networkManager.set_invoice_invoiced(invoice.id)
            .then(invoice=>{
                invoiceDetaileContext.setInvoice(invoice)
            })
            .catch(error => {
                if (error.response.data == 'OrderStateError'){
                    console.log('OK')
                    setRegular_message_active(true)
                }
                console.log('Iam ERROR',error.response.data);
                throw error;
            });
    }


    function setInvoicePaid(){
        networkManager.set_invoice_paid(invoice.id)
            .then(invoice=>{
                invoiceDetaileContext.setInvoice(invoice)
            })
    }
    

    function renderStateButton(){
        let message = `If you set Invoice# ${invoice.id} on ${invoice.date} "Invoiced" you will not be able to delete it.`
        if (invoice){
            switch (invoice.state){
                case 'Created':
                    return(
                        <div>
                            <div onClick={()=>{setYesNoQuestionActive(true)}} className='appruve_btn'>
                                <RegularButton lable={'Set invoiced'}/>
                            </div>
                            <PopupYesNoQuestion 
                                yesNoQuestionActive={yesNoQuestionActive} 
                                setYesNoQuestionActive={setYesNoQuestionActive} 
                                yesFunction={setInvoiceInvoiced} 
                                message={message}
                                />
                            
                            <PopupRegularMessage
                                regular_message_active = {regular_message_active}
                                setRegular_message_active = {setRegular_message_active}
                                message = {"You can't issue an invoice until all orders on the invoice have been delivered!"}
                            />
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