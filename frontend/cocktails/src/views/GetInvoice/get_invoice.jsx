import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export function GetInvoice() {
	let defaultForm = {
        place:'',
        invoice:'',
    }
	let [form, setForm] =  useState(defaultForm);
    let [places, setPlaces] = useState([]);
    let [invoices, setInvoices] = useState([]);
    let [invoice, setInvoice] = useState([]);
    let [loded_place, setLoadedPlace] = useState(false);


    let submitHandler = e => {
		e.preventDefault()
        axios({
            url: `http://127.0.0.1:8000/api/counter/invoice/create_pdf/${form.invoice}/`,
            method: "GET",
            responseType: "blob" 
        }).then(response => {
            let url = window.URL.createObjectURL(new Blob([response.data]));
            let link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `Invoice ${invoice.place_name} - ${invoice.date}.pdf`
            );
            document.body.appendChild(link);
            link.click();
        });	
	}


    useEffect(() => {
		axios({
		  method: 'GET',
		  url: `http://127.0.0.1:8000/api/counter/places/`
		})
        .then(response => {
            setPlaces(response.data.results);
        })
	  }, [])
    

    let getPlace = e =>{
        setForm({...form, [e.target.name]:e.target.value});
        axios
            .get( `http://127.0.0.1:8000/api/counter/invoice/?place=${e.target.value}`)
            .then(response => {
                setInvoices(response.data.results);
                setLoadedPlace(true)
				console.log(response.data.results);
			}, [])
    }


    let getInvoice = e =>{
        setForm({...form, [e.target.name]:e.target.value});
        if(e.target.value){
            axios
                .get( `http://127.0.0.1:8000/api/counter/invoice/${e.target.value}/`)
                .then(response => {
                    setInvoice(response.data);
                    console.log(response.data);
                }, [])
        }
    }
    

    function firstView(){
        return(
            <div>
                <form onSubmit={submitHandler}>
                    <div>
                        <div>
                            Download invoice  
                        </div>
                        <div>
                            Place:             
                            <select 
                            name='place' 
                            value={form.place}
                            onChange={getPlace}
                            required
                            >
                                <option>    </option>
                                {places.map(place=>(
                                    <option key={place.id} value={place.id}>{place.name}</option>
                                ))}
                            </select> 
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    

    function secondView(){
        return(
            <div>
                <form onSubmit={submitHandler}>
                    <div>
                        <div>
                            Download invoice 
                        </div>
                        <div>
                            Place: 
                            <select 
                            name='place' 
                            value={form.place}
                            onChange={getPlace}
                            required
                            >
                                {places.map(place=>(
                                    <option key={place.id} value={place.id}>{place.name}</option>
                                ))}
                            </select> 
                        </div>
                        <div>
                            Invoice: 
                            <select 
                            name='invoice' 
                            value={form.invoice}
                            onChange={getInvoice}
                            required
                            >
                                <option></option>
                                {invoices.map(invoice=>(
                                    <option key={invoice.id} value={invoice.id}>Invoice on {invoice.date}</option>
                                ))}
                            </select> 
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
        </div>
        )
    }


    function Render(props){
        let isLoaded = props;
        if (isLoaded){
            return secondView()
        }else{
            return firstView()
        }
    }


    return(
        <div>
            {Render(loded_place)}
        </div>
    )
}