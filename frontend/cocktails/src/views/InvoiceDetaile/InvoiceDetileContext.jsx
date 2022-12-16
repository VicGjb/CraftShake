import React from "react";
import { useContext } from "react";
import { useState } from "react";


let InvoiceDetaileContext = React.createContext();

export function useInvoiceDetaileContext(){
    return useContext (InvoiceDetaileContext)
}

export function InvoiceDetaileContextProvider({children}){
    let [invoice,setInvoice] = useState();
    let [isVat, setIsVat] = useState(false)

    return(
        <InvoiceDetaileContext.Provider value={{
            setInvoice:setInvoice,
            getInvoice:invoice,
            setIsVat:setIsVat,
            getIsVat:isVat,
        }}>
            {children}
        </InvoiceDetaileContext.Provider>
    )
}