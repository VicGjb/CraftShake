import React from "react";
import { ChangeProduct } from "../../views/ProductDetaile/change_product";

export function PopupChangeProduct({product, change_product_active, setChangeProductActive}){

    return(
        <div className={change_product_active ? 'popup_wrapper active' : 'popup_wrapper'} onClick={()=>setChangeProductActive(false)}>
            <div className="popup_add_product_content" onClick={e => e.stopPropagation()}>
                <div className="popup_title">
                    Change {product.name}
                </div>
                <div className="popup_add_product_form_wrapper">
                    <ChangeProduct product={product} setChangeProductActive={setChangeProductActive}/>  
                </div>              
            </div>
        </div>
    )
}