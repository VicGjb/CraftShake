import React from "react";
import { useManeContext } from "../../components/main_context";
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"
import '../../styles/popup_menu_position_card.scss'
export function PopupMenuPositionCard({
    menuPositionCardPopupActive,
    setMenuPositionCardPopupActiv,
    menuPosition,
}){
    let mainContext = useManeContext()
    
    
    return(
        <div className={menuPositionCardPopupActive ? 'popup_mobile_wrapper active' : 'popup_mobile_wrapper'} onClick={()=>setMenuPositionCardPopupActiv(false)}>
            <div className="popup_mobsile_content menu_position_card" onClick={e => e.stopPropagation()}>
                <div className="popup_filter_sevice_button_wrapper">
                    <div className="popup_filter_close_button" onClick={()=>{setMenuPositionCardPopupActiv(false)}}>
                        <CloseIcon className='close_button_icon'/>
                    </div> 
                </div>
                
                <div className="menu_position_card_title">
                    <div className="menu_position_photo">
                        <img src={mainContext.getPhoto(menuPosition.photo)} alt=""/> 
                    </div>
                    <div className="name_volume_price_conteiner">
                        <div className="menu_position_name">
                            {menuPosition.name}
                        </div>
                        <div className="menu_position_volume">
                            <span>Volume: </span>
                            <span>{Number(menuPosition.volume).toFixed(0)} ml </span>  
                        </div>
                        <div className="menu_position_price">
                            <span>Price: </span>
                            <span>{menuPosition.sale_price} ₪ </span>
                        </div>
                    </div>
                </div>
                <div className="menu_position_description">
                    {menuPosition.description}    
                </div>        
                <div className="popup_footer">
                </div>
            </div>
        </div>

    )
}