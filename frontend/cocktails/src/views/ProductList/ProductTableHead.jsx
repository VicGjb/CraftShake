import React from "react";
import '../../styles/product_table_head.scss'

export function ProductTableHead(){
    return(
        <div className="product_table_head_wrapper">
            <div className="product_table_head_slot photo">
                Photo
            </div>
            <div className="product_table_head_slot name">
                Name
            </div>
            
            <div className="product_table_head_slot description">
                Description 
            </div>
            <div className="product_table_head_slot price">
                Price
            </div>
        </div>
    )
}