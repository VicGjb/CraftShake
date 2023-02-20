import React, { useEffect, useState } from "react";
import { NetworkManager } from "../../components/network_manager";
import { AddButton } from "../../components/buttons/add_button";
import { Link } from "react-router-dom";
import { PopupAddProduct } from "../../components/popup/popup_add_product";
import {ReactComponent as SearchBtn} from "../../svg/search.svg"
import { useManeContext } from "../../components/main_context";
import { ProductListMobile } from "./ProductListMobile";
import { RegularButton } from "../../components/buttons/regular_button";
import '../../styles/product_list.scss'
import { ProductTableHead } from "./ProductTableHead";
import { ProductCard } from "./ProductCard";
import { Loading } from "../../components/loader";

export function ProductList(){
    let [products, setProducts] = useState([]);
    let [add_product_active, setAddProductActive] = useState(false)
    let [isLoaded, setIsLoaded] = useState(false)
    let network_manager = new NetworkManager()
    let mainContext = useManeContext()
    let user = mainContext.getUserFromMainContext()
    
    useEffect(()=> {
        network_manager.get_product_list()
        .then(products => {
            setProducts(products);
            setIsLoaded(true)
        })
    }, [])



    function getProductListByName(e){
        if (e.target.value === ''){
            network_manager.get_product_list()
            .then(products => {
                setProducts(products);
                })
                return
            }
        network_manager.get_products_by_name(e.target.value)
            .then(response=>{
                setProducts(response)
            })
    }


    function ProductListView(){
        return(
            <div className="product_list_wrapper">
                <div className="greetings">
                    Hello, {user.first_name}!
                </div>
                <div className="mobile_content">
                    <ProductListMobile products={products} setProducts={setProducts}/>
                </div>
                <div className="monitor_content">
                    <div className="add_product_btn" onClick={()=>setAddProductActive(true)}>
                        <RegularButton lable={'Add product'}/>
                    </div>
                    <div className="search_wrapper">
                        <input 
                                type="text" 
                                className="search_input"
                                onChange={getProductListByName}
                                />
                        <SearchBtn className='search_icon'/>
                    </div>
                    <div className="product_table">
                        <ProductTableHead/>
                        {products.map(product=>(
                            <Link to={`${product.id}`} key={product.id}>
                                 <ProductCard product={product}/>
                            </Link>
                        ))}
                    </div>
                   
                    <PopupAddProduct 
                        add_product_active={add_product_active} 
                        setAddProductActive={setAddProductActive}
                        setProducts = {setProducts}
                        />
                </div>
            </div>
        )
    }


    function Render(props){
        let isLoaded = props;
        if(isLoaded){
            return ProductListView()
        } else {
            
            return(
                <Loading/>
            )
        }
    }

    return (
        Render(isLoaded)  
    )
}