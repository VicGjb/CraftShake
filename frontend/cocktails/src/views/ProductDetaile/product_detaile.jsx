import React, {useEffect,useState} from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { RegularButton } from "../../components/buttons/regular_button";
import { PopupUploadProductPhoto } from "../../components/popup/popup_change_photo";
import { PopupChangeProduct } from "../../components/popup/popup_change_product";
import { PopupDelete } from "../../components/popup/popup_delete";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function ProductDetaile(){
    let [product, setProduct] = useState({});
    let [is_loaded, setIsLoaded] = useState(false)
    let {productId} = useParams();
    let navigate = useNavigate();

    let [upload_product_photo_active, setUploadProductPhotoActive] = useState(false);
    let [change_product_active, setChangeProductActive] = useState(false);
    let [delete_active,setDelete_active] = useState(false)

    useEffect(() => {
        axios({
          method: 'GET',
          url: `http://127.0.0.1:8000/api/counter/product/${productId}`
            }).then(response => { 
                setProduct(response.data);
                setIsLoaded(true);
            })
        }, [productId])

    function deleteProduct(){
        axios
        .post(`http://127.0.0.1:8000/api/counter/product/${productId}/delete`)
        .then(response=>{
            console.log('product deleted',response);
        })
        .catch(error=>{
            console.log(error);
            throw error;
        });
        navigate(`/products`)
    }   

    function ProductDetaileView(){
        return(
            <div>
                <div className="product_detaile_wrap">
                    <div className="product_detaile_suptitle_wrapper">
                        <div className="product_detaile_subtitle">
                            {product.name}
                        </div>
                    </div>
                        
                    <div className="product_detaile__content">
                        <div className="product_detaile_conteiner">
                            <div className="product_detaile_photo">
                                <img src={product.photo} alt="" />
                            </div>
                            <div className="product_detaile_info">
                                <div className="product_detaile_discription ">
                                    {product.discription}
                                </div>
                                <div className="product_detaile_price_line">
                                    <div className="product_detaile_cost_price">
                                        Cost price: {product.cost_price}
                                    </div>
                                    <div className="product_detaile_sell_price">
                                        Sale price: {product.sale_price}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product_detaile_button_set">
                            <div className="product_detailt_change_photo_btn" onClick={()=>setUploadProductPhotoActive(true)} >
                                <RegularButton lable={'Change photo'}/>
                            </div>
                            <div className="product_detaile_change_product_btn">
                                <div className="change_btn" onClick={()=>setChangeProductActive(true)}>
                                    <RegularButton lable={'Change product'} />   
                                </div>
                                <div className="product_detaile_delete_btn" onClick={()=> setDelete_active(true)}>
                                    <RegularButton lable={'Delete product'}/>
                                </div>
                            </div>
                        </div>                     
                    </div>
                </div>
                <PopupUploadProductPhoto upload_product_photo_active={upload_product_photo_active} setUploadProductPhotoActive={setUploadProductPhotoActive}/>
                <PopupChangeProduct product={product} change_product_active={change_product_active} setChangeProductActive={setChangeProductActive}/>
                <PopupDelete subject={`product ${product.name}`} delete_active={delete_active} setDelete_active={setDelete_active} func={deleteProduct}/>            
            </div>
        )
        
    }

    function Render(props){
        let isLoad = props
        if(isLoad){
            return ProductDetaileView()
        }else{
            return(
                <div>Loaded</div>
            )
        }
    }

    return(
        <div>
            {/* {ProductDetaileView()} */}
          {Render(is_loaded)}  
        </div>
    )
}