import React from "react";
import { InvoiceDetaileContent } from "./InvoiceDetaileContent";
import { InvoiceDetaileContextProvider } from "./InvoiceDetileContext";

export function InvoiceDetaile(){

    return(
        <InvoiceDetaileContextProvider>
            <InvoiceDetaileContent/>
        </InvoiceDetaileContextProvider>
    )
}