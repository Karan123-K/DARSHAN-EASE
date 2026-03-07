import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminBookings() {

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {

    try {

      const res = await API.get("/bookings/admin");

      setBookings(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (

    <div className="container mt-4">

      <h2>All Bookings</h2>

      {bookings.map((b) => (

        <div key={b._id} className="card p-3 mb-3">

          <p>
            <b>User:</b> {b.user?.name} ({b.user?.email})
          </p>

          <p>
            <b>Temple:</b> {b.temple?.name}
          </p>

          <p>
            <b>Date:</b> {new Date(b.slot?.date).toDateString()}
          </p>

          <p>
            <b>Time:</b> {b.slot?.time}
          </p>

        </div>

      ))}

    </div>

  );

}

export default AdminBookings;