import React, { useEffect, useState } from "react";
import axios from 'axios';
import { AddButton } from "../../components/buttons/add_button";
import { Link } from "react-router-dom";
import '../../App.scss'
import { PopupAddProduct } from "../../components/popup/popup_add_product";

export function ProductList(){
    let [products, setProducts] = useState([]);
    let [add_product_active, setAddProductActive] = useState(false)

    useEffect(()=> {
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/counter/product/'
        }).then(response => {setProducts(response.data.results);
    })
    }, [])
    return (
        <div className='product_list_wrap'>
            <div className="products_list_subtitle">
                <div>Products</div>
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
                                                <img src={product.photo} alt="" /> 
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
                <div className="products_list_button_set" onClick={()=>setAddProductActive(true)}>
                    <div>
                       <AddButton lable='Add product'/> 
                    </div> 
                </div>
            </div>
            <PopupAddProduct add_product_active={add_product_active} setAddProductActive={setAddProductActive}/>
        </div>
    )
}