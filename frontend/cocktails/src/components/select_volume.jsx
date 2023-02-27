import React from "react";
import { useState } from "react";
import { useManeContext } from "./main_context";
import { Volume } from "./volume/volume";


export function SelectVolume({onChange}){

    let main_context = useManeContext()
    let volume_list = main_context.getVolumesFromMainContext()
    let [volume, setVolome] = useState(main_context.getDefaultVolume())

    function changeHandler(e){
        setVolome(e.target.value)
        let id = e.target.value
        let value = volume_list.filter(volume=>(volume.id == e.target.value))[0].value
        let name = volume_list.filter(volume=>(volume.id == e.target.value))[0].name
        let result = new Volume(id,value,name)
        onChange(result)
    }

    return(
        <select
            className="select-css" 
            name="volome" 
            value={volume}
            onChange={changeHandler}
            required               
            >
            {volume_list.reverse().map(volume=>(
                <option key={volume.id} value={volume.id}>{volume.name}</option>
            ))}
        </select>
    )
}