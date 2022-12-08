import React from "react";
import { useState } from "react";
import { useManeContext } from "../../components/main_context";
import { NetworkManager } from "../../components/network_manager";
import {ReactComponent as SearchBtn} from "../../svg/search.svg";
import '../../styles/product_list_mobile.scss'
import { RegularButton } from "../../components/buttons/regular_button";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { ProductTableHead } from "./ProductTableHead";
import { PopupAddProduct } from "../../components/popup/popup_add_product";

export function ProductListMobile({products,setProducts}){
    let mainContext = useManeContext()
    let [add_product_active, setAddProductActive] = useState(false)
    let networkManager = new NetworkManager()
    
    function getProductListByName(e){
        if (e.target.value === ''){
            networkManager.get_product_list()
            .then(products => {
                setProducts(products);
                })
                return
            }
            networkManager.get_products_by_name(e.target.value)
            .then(response=>{
                setProducts(response)
            })
    }


    return(
        <div className="mobile_wrapper">
            <div className="add_product_btn" onClick={()=>{setAddProductActive(true)}}>
                <RegularButton className='add_product' lable={'Add product'}/>
            </div>
            <div className="mobile_search_wrapper">
                <input 
                    type="text" 
                    className="mobile_search_input"
                    onChange={getProductListByName}
                    />
                <SearchBtn className='mobile_search_icon'/>
            </div>
            <div className="product_table">
                <ProductTableHead/>
                {products.map(product => (
                    <Link to={`${product.id}`} key={product.id}>
                        <ProductCard product={product}/>
                    </Link>
                ))}
            </div>
            <PopupAddProduct add_product_active={add_product_active} setAddProductActive={setAddProductActive}/>
        </div>
    )
}