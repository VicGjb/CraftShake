// import React, { Component, useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// export function AddInvoice() {
// 	let defaultForm = {
//         place:'',
//         date:'',
//         from_date:'',
//         until_date:'',
//         is_vat:false,
//     }
// 	let [form, setForm] =  useState(defaultForm);
//     let [places, setPlaces] = useState([]);
//     let [loaded, setLoaded] = useState(false);

//     let changeHandler = e => {
// 		setForm({...form, [e.target.name]:e.target.value});
//         console.log(form)
// 	}   

//     let submitHandler = e => {
// 		e.preventDefault()
//         console.log(form)
//         axios
// 			.post('http://127.0.0.1:8000/api/counter/invoice/create/', form)
// 			.then(response => {
// 				console.log(response);
// 			})
// 			.catch(error => {
// 				console.log(error);
// 				throw error;
// 			});		
// 	}

//     useEffect(() => {
// 		axios({
// 		  method: 'GET',
// 		  url: `http://127.0.0.1:8000/api/counter/places/`
// 		})
//         .then(response => {
//             setPlaces(response.data.results);
//             setLoaded(true)
//         })
// 	  }, [])
    
//     return(
//         <div>
//             <form onSubmit={submitHandler}>
// 				<div>
//                     <div>
//                         Invoice FOR 
//                     </div>
//                     <div>
//                         Place: 
//                         <select 
//                         name='place' 
//                         value={form.place}
//                         onChange={changeHandler}
//                         required
//                         >
//                             <option></option>
//                             {places.map(place=>(
//                                 <option key={place.id} value={place.id}>{place.name}</option>
//                             ))}
//                         </select> 
//                     </div>
// 					<div>
//                         Date: 
//                         <input
//                             type="date"
//                             name="date"
//                             value={form.date}
//                             onChange={changeHandler}
//                         />
//                     </div>
//                     <div>
//                         From: 
//                         <input
//                             type="date"
//                             name="from_date"
//                             value={form.from_date}
//                             onChange={changeHandler}
//                         />
//                     </div>
//                     <div>
//                         Until: 
//                         <input
//                             type="date"
//                             name="until_date"
//                             value={form.until_date}
//                             onChange={changeHandler}
//                         />
//                     </div>
//                     <div>
//                         Add VAT: 
//                         <input
//                             type="checkbox"
//                             name="is_vat"
//                             value={form.is_vat}
//                             checked={form.is_vat}
//                             onChange={() => setForm(prev=> ({...prev, is_vat: !prev.is_vat}))}
//                         />
//                     </div>
//                 </div>
//                 <button type="submit">Submit</button>
//             </form>
//           </div>
//     )
// }
	