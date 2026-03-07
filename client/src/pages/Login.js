import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login(){

 const navigate = useNavigate();

 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");

 const handleLogin = async (e) => {

  e.preventDefault();

  try{

   const res = await API.post("/auth/login",{
    email,
    password
   });

   localStorage.setItem("token", res.data.token);

   alert("Login successful");

   navigate("/temples");   // React redirect

  }catch(error){

   console.log(error);

   alert("Login failed");

  }

 };

 return(

  <div className="container mt-5" style={{maxWidth:"400px"}}>

   <h2>Login</h2>

   <form onSubmit={handleLogin}>

    <div className="mb-3">

     <input
      className="form-control"
      placeholder="Email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
     />

    </div>

    <div className="mb-3">

     <input
      type="password"
      className="form-control"
      placeholder="Password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
     />

    </div>

    <button className="btn btn-primary w-100">
     Login
    </button>

   </form>

  </div>

 );

}

export default Login;