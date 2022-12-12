import React from "react";
import { useState } from "react";
import { useManeContext } from "./main_context";
import { Volume } from "./volume/volume";


export function SelectVolume({onChange}){

    let main_context = useManeContext()
    let volumes = main_context.getVolumesFromMainContext()
    let [volume, setVolome] = useState(1)

    function changeHandler(e){
        setVolome(e.target.value)
        let id = e.target.value
        let value = volumes.filter(volume=>(volume.id == e.target.value))[0].value
        let name = volumes.filter(volume=>(volume.id == e.target.value))[0].name
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
            {volumes.map(volume=>(
                <option key={volume.id} value={volume.id}>{volume.name}</option>
            ))}
        </select>
    )
}