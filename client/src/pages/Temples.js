import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function Temples(){

 const [temples,setTemples] = useState([]);

 useEffect(()=>{

  API.get("/temples")
   .then(res => setTemples(res.data))
   .catch(err => console.log(err));

 },[]);

 return(

  <div className="container mt-4">

   <h2 className="text-center mb-4">Available Temples</h2>

   <div className="row">

    {temples.map(t => (

     <div key={t._id} className="col-md-4 mb-4">

      <div className="card shadow-sm h-100">

       {/* Temple Image */}
       <img
        src="https://images.unsplash.com/photo-1548013146-72479768bada"
        className="card-img-top"
        alt="temple"
        style={{height:"200px", objectFit:"cover"}}
       />

       <div className="card-body text-center">

        <h5 className="card-title">{t.name}</h5>

        <p className="text-muted">{t.location}</p>

        <Link
         to={`/temple/${t._id}`}
         className="btn btn-primary"
        >
         View Slots
        </Link>

       </div>

      </div>

     </div>

    ))}

   </div>

  </div>

 );

}

export default Temples;