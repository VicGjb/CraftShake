import React from "react";
import { AddProduct } from "../../views/AddProductForm/add_product";

export function PopupAddProduct({add_product_active, setAddProductActive}){
    

    return(
        <div className={add_product_active ? 'popup_wrapper active' : 'popup_wrapper'} onClick={()=>setAddProductActive(false)}>
            <div className="popup_add_product_content" onClick={e => e.stopPropagation()}>
                <div className="popup_title">
                    New Product
                </div>
                <div className="popup_add_product_form_wrapper">
                    <AddProduct setAddProductActive={setAddProductActive}/>  
                </div>              
            </div>
        </div>
    )
}