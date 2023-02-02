import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import {ReactComponent as UpArrow} from '../svg/arrow_up_icon.svg'
import {ReactComponent as DownUrrow} from "../svg/arrow_down_icon.svg"

import {ReactComponent as PlusIcon} from "../svg/plus_icon.svg"
import {ReactComponent as MinusIcon} from "../svg/minus_icon.svg"

export function InputNumber({onChange}){
    let[qnty, setQnty] = useState(1)
    let [windowWidth, setWindowWidth] = useState(window.innerWidth)


    useEffect(()=>{
        function handleResize() {
                setWindowWidth(window.innerWidth)
            }
        window.addEventListener('resize', handleResize)
        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })
    useEffect(()=>{
        //console.log('RESIZE')
        if(window.innerWidth < 990){
            setQnty(0)
            }
        else{ 
            setQnty(1)
        }
    },[windowWidth])

    let plus =()=>{
        setQnty(qnty+1)
        onChange(Number(qnty+1));
        setQnty(Number(qnty+1));

    }
    let minus =()=>{
        if (qnty>+0){
            setQnty(qnty-1);
            onChange(Number(qnty-1));
            setQnty(Number(qnty-1));  
        }else{
            setQnty(0)
        }
    }

    function renderIcons(){
        if(window.innerWidth < 990){
            return(
                {
                    'more':<PlusIcon className='number_icon'/>,
                    'less':<MinusIcon className='number_icon'/>,
                }
            )
        }else{
            return(
                {
                    'more':<UpArrow className='arrow_icon'/>,
                    'less':<DownUrrow className='arrow_icon'/>
                }
            )
        }
    }

    function ChangeHendler(e){
        onChange(Number(e.target.value));
        setQnty(Number(e.target.value));
    }
    
    return(
        <div className="quantity_block">
            <button className="quantity_arrow_plus" onClick={plus}>{renderIcons().more}  </button>
            <input className="quantity_num" min='0'  type="number" value={qnty} onChange={ChangeHendler}/>
            <button className="quantity_arrow_minus" onClick={minus}>{renderIcons().less}</button>
        </div>
)
}