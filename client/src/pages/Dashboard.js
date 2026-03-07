import { useEffect,useState,useRef } from "react";
import API from "../api/axios";
import html2canvas from "html2canvas";

function Dashboard(){

 const [bookings,setBookings] = useState([]);
 const ticketRefs = useRef({});


 const fetchBookings = async ()=>{

  try{

   const res = await API.get("/bookings/user");

   setBookings(res.data);

  }catch(error){

   console.log(error);

  }

 };


 useEffect(()=>{
  fetchBookings();
 },[]);



 const cancelBooking = async (id) => {

  const confirmCancel = window.confirm("Cancel this booking?");

  if(!confirmCancel) return;

  try{

   await API.delete(`/bookings/${id}`);

   alert("Booking cancelled");

   fetchBookings();

  }catch(error){

   console.log(error);

   alert("Failed to cancel booking");

  }

 };



 const downloadTicket = async (id) => {

  const element = ticketRefs.current[id];

  const canvas = await html2canvas(element);

  const link = document.createElement("a");

  link.download = "darshan-ticket.png";

  link.href = canvas.toDataURL();

  link.click();

 };


 return(

  <div className="container mt-4">

   <h2 className="mb-4">My Darshan Bookings</h2>

   <div className="row">

    {bookings.map(b=>(

     <div key={b._id} className="col-md-4 mb-4">

      <div
       className="card p-3 text-center"
       ref={(el)=> ticketRefs.current[b._id] = el}
      >

       <h5>{b.temple?.name}</h5>

       <p>{b.temple?.location}</p>

       <p>
        <b>Date:</b>{" "}
        {b.slot?.date
         ? new Date(b.slot.date).toDateString()
         : ""}
       </p>

       <p>
        <b>Time:</b> {b.slot?.time}
       </p>


       {/* QR CENTERED */}

       {b.qrCode && (

        <div className="d-flex justify-content-center my-3">

         <img
          src={b.qrCode}
          alt="QR Ticket"
          width="150"
         />

        </div>

       )}


       {/* BUTTONS BELOW QR */}

       <div className="d-flex justify-content-center gap-2 mt-2">

        <button
         className="btn btn-success"
         onClick={()=>downloadTicket(b._id)}
        >
         Download Ticket
        </button>

        <button
         className="btn btn-danger"
         onClick={()=>cancelBooking(b._id)}
        >
         Cancel Booking
        </button>

       </div>

      </div>

     </div>

    ))}

   </div>

  </div>

 );

}

export default Dashboard;