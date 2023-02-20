// import React from "react";
// import axios from "axios";
// import { useState } from "react";
// import { RegularButton } from "../../components/buttons/regular_button";
// import { useNavigate } from "react-router-dom";

// export function Auth(){
//     let defaultForm = {
//         username:'',
//         password:''
//     }
//     let [form, setForm] = useState(defaultForm)
//     let navigate = useNavigate()

//     function changeHendler(e){
//         setForm({...form, [e.target.name]:e.target.value})
//         //console.log('form',form)
//     }

//     function submitHendler(e){
//         e.preventDefault()
//         axios
//             .post(`http://127.0.0.1:8000/auth/token/login/`,form)
//             .then(response=>(
//                 //console.log('login',response)
//             ))
//             .then(
//               navigate(`/placeList`)  
//             )
            
//     }
//     return(
//         <form onSubmit={submitHendler}>
//             <div className="input_auth">
//                 <div className="regular_text_small">User name</div>
//                 <input 
//                     type="text"
//                     name="username" 
//                     onChange={changeHendler}
//                     />
//             </div>
//             <div className="input_auth">
//                 <div className="regular_text_small">Password</div>
//                 <input 
//                     type="text"
//                     name="password" 
//                     onChange={changeHendler}
//                     />
//             </div>
//             <div type='submit'>
//                 <RegularButton lable={'login'}/>
//             </div>
//         </form>
//     )
// }