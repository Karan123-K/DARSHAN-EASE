import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

function AdminDashboard() {

 const [temples,setTemples] = useState([]);
 const [bookings,setBookings] = useState([]);
 const [slots,setSlots] = useState([]);

 const fetchData = async () => {

  try{

   const templesRes = await API.get("/temples");
   const bookingsRes = await API.get("/bookings/admin");
   const slotsRes = await API.get("/slots");

   setTemples(templesRes.data);
   setBookings(bookingsRes.data);
   setSlots(slotsRes.data);

  }catch(error){

   console.log(error);

  }

 };

 useEffect(()=>{
  fetchData();
 },[]);

 return(

 <div className="container mt-4">

  <h2 className="text-center mb-4">Admin Dashboard</h2>


  {/* STATISTICS */}

  <div className="row text-center mb-4">

   <div className="col-md-4 mb-3">

    <div className="card shadow-sm border-0 p-3">

     <h6 className="text-muted">Total Temples</h6>
     <h2 className="text-primary">{temples.length}</h2>

    </div>

   </div>


   <div className="col-md-4 mb-3">

    <div className="card shadow-sm border-0 p-3">

     <h6 className="text-muted">Total Bookings</h6>
     <h2 className="text-success">{bookings.length}</h2>

    </div>

   </div>


   <div className="col-md-4 mb-3">

    <div className="card shadow-sm border-0 p-3">

     <h6 className="text-muted">Total Slots</h6>
     <h2 className="text-warning">{slots.length}</h2>

    </div>

   </div>

  </div>



  {/* ADMIN ACTIONS */}

  <div className="row text-center mb-5">

   <div className="col-md-3 mb-2">

    <Link
     to="/admin/temples"
     className="btn btn-primary w-100"
    >
     Manage Temples
    </Link>

   </div>


   <div className="col-md-3 mb-2">

    <Link
     to="/admin/slots"
     className="btn btn-success w-100"
    >
     Manage Slots
    </Link>

   </div>


   <div className="col-md-3 mb-2">

    <Link
     to="/admin/bookings"
     className="btn btn-warning w-100"
    >
     View Bookings
    </Link>

   </div>


   <div className="col-md-3 mb-2">

    <Link
     to="/admin/stats"
     className="btn btn-info w-100"
    >
     Booking Analytics
    </Link>

   </div>

  </div>



  {/* RECENT BOOKINGS */}

  <div className="card shadow-sm">

   <div className="card-body">

    <h5 className="mb-3">Recent Bookings</h5>

    <table className="table table-hover">

     <thead className="table-light">

      <tr>

       <th>User</th>
       <th>Temple</th>
       <th>Date</th>
       <th>Time</th>

      </tr>

     </thead>

     <tbody>

      {bookings.slice(0,5).map(b => (

       <tr key={b._id}>

        <td>{b.user?.name}</td>
        <td>{b.temple?.name}</td>
        <td>
         {b.slot?.date
          ? new Date(b.slot.date).toDateString()
          : ""}
        </td>
        <td>{b.slot?.time}</td>

       </tr>

      ))}

     </tbody>

    </table>

   </div>

  </div>

 </div>

 );

}

export default AdminDashboard;