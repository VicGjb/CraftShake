import React from "react";
// import {Titel} from "../../public" 
// import {ReactComponent as Title} from "../svg/main_title.svg";
import {ReactComponent as Logo} from "../svg/logo.svg";
export function MainTitle(){
    return(
        <div className="main_title">
                <Logo className='svg_title'/>
                {/* <img src="Titel.svg" alt=""/>    */}
        </div>
    )
}