import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

function TempleDetails() {

  const { id } = useParams();

  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  // Fetch slots
  const fetchSlots = async () => {

    try {

      const res = await API.get(`/slots/${id}`);
      setSlots(res.data);

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {
    fetchSlots();
  }, [id]);


  // Booking function
  const handleBooking = async (slotId) => {

    setLoading(true);
    setMessage("");

    try {

      await API.post("/bookings", {
        slotId: slotId,
        templeId: id
      });

      setMessage("✅ Darshan booked successfully!");

      fetchSlots();

    } catch (error) {

      console.log(error);
      setMessage("❌ Booking failed");

    }

    setLoading(false);

  };


  return (

    <div className="container mt-4">

      <h2>Available Slots</h2>

      {message && (
        <div className="alert alert-info mt-3">
          {message}
        </div>
      )}

      <div className="row mt-3">

        {slots.map(slot => (

          <div className="col-md-4" key={slot._id}>

            <div className="card mb-3">

              <div className="card-body">

                <h5 className="card-title">
                  {new Date(slot.date).toDateString()}
                </h5>

                <p className="card-text">
                  Time: {slot.time}
                </p>

                <p className="card-text">
                  Available: {slot.available}
                </p>

                <button
                  className="btn btn-success"
                  disabled={loading || slot.available === 0}
                  onClick={() => handleBooking(slot._id)}
                >
                  {slot.available === 0 ? "Full" : "Book Slot"}
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default TempleDetails;