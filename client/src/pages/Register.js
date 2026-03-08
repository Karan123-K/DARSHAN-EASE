import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

function Register(){
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const res = await API.post("/auth/register",{
        name,
        email,
        password,
        role
      });

      login(res.data.token);

      alert("User account created successfully");

      navigate("/temples");

    }catch(error){
      console.log(error.response?.data);
      alert("Registration failed");
    }
  };

  return(
    <div className="container mt-5" style={{maxWidth:"400px"}}>
      <h2>User Registration</h2>
      <p className="text-muted">Create your account to book temple darshan</p>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <select
          className="form-select mb-3"
          value={role}
          onChange={(e)=>setRole(e.target.value)}
        >
          <option value="user">Register as User</option>
          <option value="organizer">Register as Organizer</option>
          <option value="admin">Register as Admin</option>
        </select>

        <button className="btn btn-primary w-100">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Register;