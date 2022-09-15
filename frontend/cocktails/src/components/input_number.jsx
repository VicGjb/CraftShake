import React from "react";
import { useState } from "react";


export function InputNumber({onChange}){
    let[qnty, setQnty] = useState(0)

    const plus =()=>{
        setQnty(qnty+1)
        onChange(Number(qnty+1));
        setQnty(Number(qnty+1));

    }
    const minus =()=>{
        if (qnty>+0){
            setQnty(qnty-1);
            onChange(Number(qnty-1));
            setQnty(Number(qnty-1));  
        }else{
            setQnty(0)
        }
    }

    function ChangeHendler(e){
        onChange(Number(e.target.value));
        setQnty(Number(e.target.value));
        console.log('yes')
    }
    
    return(
        <div className="slot">
            <div className="quantity_block regular_text_small">
                <button className="quantity_arrow_minus regular_text_small" onClick={minus}> - </button>
                <input className="quantity_num regular_text_small" min='0'  type="number" value={qnty} onChange={ChangeHendler}/>
                <button className="quantity_arrow_plus regular_text_small" onClick={plus}> + </button>
            </div>
        </div>
)
}