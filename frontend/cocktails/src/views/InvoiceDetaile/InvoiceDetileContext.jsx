import React from "react";
import { useContext } from "react";
import { useState } from "react";


let InvoiceDetaileContext = React.createContext();

export function useInvoiceDetaileContext(){
    return useContext (InvoiceDetaileContext)
}

export function InvoiceDetaileContextProvider({children}){
    let [invoice,setInvoice] = useState();
    let defaultForm = {
        state:'',
        is_vat:false,
    }
    let [form,setForm] = useState(defaultForm)
    let [isVat, setIsVat] = useState(false)

    return(
        <InvoiceDetaileContext.Provider value={{
            setInvoice:setInvoice,
            getInvoice:invoice,
            setForm:setForm,
            getForm:form,
            setIsVat:setIsVat,
            getIsVat:isVat,
        }}>
            {children}
        </InvoiceDetaileContext.Provider>
    )
}