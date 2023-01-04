import React from "react";
import { useManeContext } from "../../components/main_context";
import '../../styles/product_card.scss'

export function ProductCard({product}){
    let mainContext = useManeContext()
    return(
        <div className="product_card_wrapper">
            <div className="product_card_value_wrapper photo">
                <div className="product_photo">
                    <img src={mainContext.getPhoto(product.photo)} alt="" /> 
                </div>
            </div>
            <div className="product_card_value_wrapper name">
               <div className="product_name">
                    {product.name}
                </div> 
            </div>
            
            <div className="product_card_value_wrapper description">
                <div className="product_description">{product.description}</div>
            </div>
            <div className="product_card_value_wrapper price">
                <div>{product.cost_price}</div>
            </div>
        </div>
    )
}
