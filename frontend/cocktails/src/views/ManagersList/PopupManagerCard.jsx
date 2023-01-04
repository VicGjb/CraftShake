import React from "react";
import { useManeContext } from "../../components/main_context";
import {ReactComponent as CloseIcon} from "../../svg/close_icon.svg"
import '../../styles/popup_menu_position_card.scss'

export function PopupManagerCard({
    managerCardPopupActive,
    setManagerCardPopupActive,
    manager,
}){
    let mainContext = useManeContext()
    
    
    return(
        // <div>
            <div className={managerCardPopupActive ? 'popup_mobile_wrapper active' : 'popup_mobile_wrapper'} onClick={()=>setManagerCardPopupActive(false)}>
                <div className="popup_mobsile_content menu_position_card" onClick={e => e.stopPropagation()}>
                    <div className="popup_filter_sevice_button_wrapper">
                        <div className="popup_filter_close_button" onClick={()=>{setManagerCardPopupActive(false)}}>
                            <CloseIcon className='close_button_icon'/>
                        </div> 
                    </div>
                    
                    <div className="menu_position_card_title">
                        <div className="name_volume_price_conteiner">
                            <div className="menu_position_name">
                                {manager.name}
                            </div>
                            <div className="menu_position_volume">
                                {manager.phone}
                            </div>
                            <div className="menu_position_price">
                                
                            </div>
                        </div>
                    </div>
                    <div className="menu_position_description">
                        <div>Description: </div>
                        {manager.description}    
                    </div>        
                    <div className="popup_footer">
                    </div>
                </div>
            </div>
        // </div>
    )
}