import { useState } from "react";
import API from "../api/axios";

function Register(){

 const [name,setName] = useState("");
 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");

 const handleSubmit = async (e) => {

  e.preventDefault();

  try{

   const res = await API.post("/auth/register",{
    name,
    email,
    password
   });

   localStorage.setItem("token",res.data.token);

   alert("Registered successfully");

   window.location.href="/temples";

  }catch(error){

   console.log(error.response?.data);

   alert("Registration failed");

  }

 };

 return(

  <div className="container mt-5">

   <h2>Register</h2>

   <form onSubmit={handleSubmit}>

    <input
     className="form-control mb-2"
     placeholder="Name"
     onChange={(e)=>setName(e.target.value)}
     required
    />

    <input
     className="form-control mb-2"
     placeholder="Email"
     onChange={(e)=>setEmail(e.target.value)}
     required
    />

    <input
     type="password"
     className="form-control mb-2"
     placeholder="Password"
     onChange={(e)=>setPassword(e.target.value)}
     required
    />

    <button className="btn btn-primary">
     Register
    </button>

   </form>

  </div>

 );

}

export default Register;