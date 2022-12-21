import React from "react";
import { ManagersContextProvider } from "./ManagersContext";
import { ManagersListContent } from "./ManagersListContent";
export function ManagersList(){

    return(
        <ManagersContextProvider>
            <ManagersListContent/>
        </ManagersContextProvider>
    )
}