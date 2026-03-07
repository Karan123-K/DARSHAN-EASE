import { useEffect, useState } from "react";
import API from "../api/axios";

function Booking(){

  const [bookings,setBookings] = useState([]);

  const token = localStorage.getItem("token");

  const fetchBookings = async () => {

    try{

      const res = await API.get(
        "/bookings/user",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setBookings(res.data);

    }catch(error){

      console.log(error);

    }

  };


  useEffect(()=>{

    fetchBookings();

  },[]);



  const cancelBooking = async(id)=>{

    try{

      await API.delete(
        `/bookings/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      alert("Booking cancelled");

      fetchBookings();

    }catch(error){

      alert("Cancel failed");

    }

  };


  return(

    <div className="container mt-4">

      <h2>Your Bookings</h2>

      <div className="row mt-3">

        {bookings.map(b => (

          <div className="col-md-4 mb-3" key={b._id}>

            <div className="card shadow-sm">

              <div className="card-body">

                <h5 className="card-title">

                  {b.temple.name}

                </h5>

                <p>

                  📍 {b.temple.location}

                </p>

                <p>

                  📅 {new Date(b.slot.date).toDateString()}

                </p>

                <p>

                  ⏰ {b.slot.time}

                </p>

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

export default Booking;