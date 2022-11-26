import React, { useEffect, useState } from "react";
import { NetworkManager } from "../../components/network_manager";
import { AddButton } from "../../components/buttons/add_button";
import { Link } from "react-router-dom";
import { PopupAddProduct } from "../../components/popup/popup_add_product";
import {ReactComponent as SearchBtn} from "../../svg/search.svg"
import { useManeContext } from "../../components/main_context";

export function ProductList(){
    let [products, setProducts] = useState([]);
    let [add_product_active, setAddProductActive] = useState(false)
    let [search_name, setSearchName] = useState('')
    let network_manager = new NetworkManager()
    let mainContext = useManeContext()
    
    useEffect(()=> {
        network_manager.get_product_list()
        .then(products => {setProducts(products);
    })
    }, [])

    function ChangeHendler(e){
        setSearchName(e.target.value)
    }

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

    return (
        <div className='product_list_wrap'>
            <div className="products_list_subtitle">
                <div>Products</div>
            </div>
            <div className="product_list_found">
                <form > 
                    <div className="product_list_found_wrapper">
                        <input 
                            type="text" 
                            name="search_product"  
                            className="product_list_found_input"
                            onChange={getProductListByName}
                            />
                    </div>    
                </form>
            </div>
            <div className="products_list_contetn">
                <div className="products_list_table_wrapper">
                    <div className="products_list_table">
                        <div className='thead'>
                            <div className="products_list_table_head tr">
                                <div className="th"><div className="regular_text">Name</div></div>
                                <div className="th"><div className="regular_text">Photo</div></div>
                                <div className="th"><div className="regular_text">Description</div></div>
                                <div className="th"><div className="regular_text">Cost price</div></div>
                            </div>
                        </div >
                        <div className='tbody product_list_table_body'>
                            {products.map(product => (
                                <Link to={`${product.id}`} key={product.id}>
                                    <div className="product_list_table_row tr">
                                        <div className="td"><div className="regular_text_small">{product.name}</div></div>
                                        <div className="td">
                                            <div className="product_photo">
                                            {/* mainContext.setProductPhoto(product.photo) */}
                                                <img src={mainContext.getPhoto(product.photo)} alt="" /> 
                                            </div>
                                        </div>
                                        
                                        <div className="td"><div className="discription regular_text_small">{product.discription}</div></div>
                                        <div className="td"><div className="regular_text_small">{product.cost_price}</div></div>
                                    </div>
                                </Link>
                            ))}
                        </div> 
                    </div>
                </div>
                <div className="products_list_button_set" >
                    <div className="add_batton_wrapper" onClick={()=>setAddProductActive(true)}>
                       <AddButton lable='Add product'/> 
                    </div> 
                </div>
            </div>
            <PopupAddProduct add_product_active={add_product_active} setAddProductActive={setAddProductActive}/>
        </div>
    )
}