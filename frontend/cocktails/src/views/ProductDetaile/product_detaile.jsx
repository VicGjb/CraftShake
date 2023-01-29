import React, {useEffect,useState} from "react";
import { NetworkManager } from "../../components/network_manager";
import { Link } from "react-router-dom";
import {useParams} from 'react-router-dom';
import { RegularButton } from "../../components/buttons/regular_button";
import { PopupUploadProductPhoto } from "../../components/popup/popup_change_photo";
import { PopupChangeProduct } from "../../components/popup/popup_change_product";
import { PopupAddProduct } from "../../components/popup/popup_add_product";
import { PopupDelete } from "../../components/popup/popup_delete";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useManeContext } from "../../components/main_context";
import '../../styles/product_detaile.scss'
import {ReactComponent as CameraIcon} from "../../svg/camera_icon.svg"

export function ProductDetaile(){
    let [product, setProduct] = useState({});
    let [is_loaded, setIsLoaded] = useState(false)
    let {productId} = useParams();
    let network_manager = new NetworkManager();
    let mainContext = useManeContext()
    let navigate = useNavigate();

    let [upload_product_photo_active, setUploadProductPhotoActive] = useState(false);
    let [add_product_active, setAddProductActive] = useState(false);
    let [delete_active,setDelete_active] = useState(false)

    useEffect(() => {
        network_manager.get_product_detaile(productId)
        .then(product => { 
                setProduct(product);
                setIsLoaded(true);
                console.log(product)
            })
        }, [productId])

    function deleteProduct(){
        network_manager.delete_product(productId)
        .then(response=>{
            console.log('product deleted',response);
            navigate(`/products`)
        })
        .catch(error=>{
            console.log(error);
            throw error;
        });
        
        
    }   

    function ProductDetaileView(){
        return(
                <div className="product_detaile_wrap">
                    <div className="product_detaile_suptitle_wrapper">
                        <div className="product_detaile_subtitle">
                            {product.name}
                        </div>
                    </div>
                    <div className="product_detaile_button_set">
                        <div className="order_detaile_back_btn">
                            <Link to={{pathname: `/products`,}} replace>
                                <RegularButton lable={'Back'}/>
                            </Link> 
                        </div>
                        <div className="product_detaile_delete_btn top" onClick={()=> setDelete_active(true)}>
                            <RegularButton lable={'Delete product'}/>
                        </div>
                        <div className="product_detaile_change_btn top" onClick={()=>setAddProductActive(true)}>
                            <RegularButton lable={'Change product'} />   
                        </div>
                    </div>    
                    <div className="product_detaile__content">
                        
                        
                        <div className="product_detaile_conteiner">
                            <div className="product_detaile_photo">
                                <div className="add_product_photo" onClick={()=>setUploadProductPhotoActive(true)}>
                                    <CameraIcon className='camera_icon'/> 
                                </div>
                                <img src={mainContext.getPhoto(product.photo)} alt="" />
                            </div>
                            <div className="product_detaile_info">
                                <div className="product_detaile_price_line">
                                    <div className="product_detaile_cost_price">
                                        Cost price: {product.cost_price} ₪
                                    </div>
                                    <div className="product_detaile_sell_price">
                                        Sale price: {product.sale_price} ₪
                                    </div>
                                </div>
                                <div className="product_detaile_discription">
                                    {product.description}
                                </div>
                            </div>
                        </div>                 
                    </div>
                    <div className="product_detaile_footer">
                        <div className="product_detaile_delete_btn" onClick={()=> setDelete_active(true)}>
                            <RegularButton lable={'Delete product'}/>
                        </div>
                        <div className="product_detaile_change_btn" onClick={()=>setAddProductActive(true)}>
                            <RegularButton lable={'Change product'} />   
                        </div>
                    </div>
                    <PopupUploadProductPhoto upload_product_photo_active={upload_product_photo_active} setUploadProductPhotoActive={setUploadProductPhotoActive} setProduct={setProduct}/>
                    <PopupAddProduct product={product} setProduct={setProduct} add_product_active={add_product_active} setAddProductActive={setAddProductActive}/>
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
          Render(is_loaded) 
    )
}