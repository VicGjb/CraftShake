import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function AddOrder() {
    let placeId = useParams()
	let defaultForm = {
        date: '',
        total_price: 0,
        place: '',
    }
    let [form, setForm] =  useState(defaultForm);
    let [place, setPlace] = useState({});

    let changeHandler = e => {
		setForm({...form, ['date']:e.target.value, ['place']:place.id});
        console.log(form)
	}   

    let submitHandler = e => {
		e.preventDefault()
        console.log(form)
        axios
			.post('http://127.0.0.1:8000/api/counter/order/create/', form)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
				throw error;
			});		
	}

    useEffect(() => {
		axios({
		  method: 'GET',
		  url: `http://127.0.0.1:8000/api/counter/place/1`
		})
        .then(response => {setPlace(response.data);
        })
	  }, [placeId, form])

    return(
        <div>
            <form onSubmit={submitHandler}>
				<div>
                    <div>
                        ORDER FOR {place.name}
                    </div>
					<div>
                        Date: 
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
          </div>
    )

}