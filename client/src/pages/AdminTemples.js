import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminTemples() {

  const [temples,setTemples] = useState([]);

  const [name,setName] = useState("");
  const [location,setLocation] = useState("");
  const [description,setDescription] = useState("");


  const fetchTemples = async ()=>{

    const res = await API.get("/temples");

    setTemples(res.data);

  };


  useEffect(()=>{

    fetchTemples();

  },[]);


  const createTemple = async (e)=>{

    e.preventDefault();

    await API.post("/temples",{
      name,
      location,
      description
    });

    setName("");
    setLocation("");
    setDescription("");

    fetchTemples();

  };


  return(

  <div className="container mt-4">

  <h2>Temple Manager</h2>

  <form onSubmit={createTemple}>

  <input
  className="form-control mb-2"
  placeholder="Temple Name"
  value={name}
  onChange={(e)=>setName(e.target.value)}
  />

  <input
  className="form-control mb-2"
  placeholder="Location"
  value={location}
  onChange={(e)=>setLocation(e.target.value)}
  />

  <textarea
  className="form-control mb-2"
  placeholder="Description"
  value={description}
  onChange={(e)=>setDescription(e.target.value)}
  />

  <button className="btn btn-primary">
  Create Temple
  </button>

  </form>


  <hr/>

  <h4>Existing Temples</h4>

  {temples.map(t=>(
    <div key={t._id} className="card p-3 mb-2">

      <h5>{t.name}</h5>
      <p>{t.location}</p>
      <p>{t.description}</p>

    </div>
  ))}

  </div>

  );

}

export default AdminTemples;