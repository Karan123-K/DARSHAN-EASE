import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminSlots() {

  const [temples,setTemples] = useState([]);
  const [selectedTemple,setSelectedTemple] = useState("");
  const [slots,setSlots] = useState([]);

  const [date,setDate] = useState("");
  const [time,setTime] = useState("");
  const [capacity,setCapacity] = useState("");



  // GET ALL TEMPLES
  const fetchTemples = async () => {

    try{

      const res = await API.get("/temples");

      setTemples(res.data);

    }catch(error){

      console.log(error);

    }

  };


  // GET SLOTS FOR TEMPLE
  const fetchSlots = async (templeId) => {

    try{

      const res = await API.get(`/slots/${templeId}`);

      setSlots(res.data);

    }catch(error){

      console.log(error);

    }

  };


  useEffect(()=>{

    fetchTemples();

  },[]);



  // CREATE SLOT
  const createSlot = async (e) => {

    e.preventDefault();

    try{

      await API.post("/slots",{

        temple:selectedTemple,
        date,
        time,
        capacity

      });

      alert("Slot created successfully");

      fetchSlots(selectedTemple);

    }catch(error){

      console.log(error);

      alert("Failed to create slot");

    }

  };



  return(

    <div className="container mt-4">

      <h2>Admin Slot Manager</h2>


      {/* SELECT TEMPLE */}

      <div className="mb-3">

        <label>Select Temple</label>

        <select
          className="form-control"
          value={selectedTemple}
          onChange={(e)=>{

            setSelectedTemple(e.target.value);

            fetchSlots(e.target.value);

          }}
        >

          <option value="">Select Temple</option>

          {temples.map(t=>(
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}

        </select>

      </div>



      {/* CREATE SLOT */}

      <form onSubmit={createSlot} className="mb-4">

        <div className="row">

          <div className="col-md-3">

            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e)=>setDate(e.target.value)}
              required
            />

          </div>


          <div className="col-md-3">

            <input
              className="form-control"
              placeholder="Time (ex: 10:00 AM)"
              value={time}
              onChange={(e)=>setTime(e.target.value)}
              required
            />

          </div>


          <div className="col-md-3">

            <input
              type="number"
              className="form-control"
              placeholder="Capacity"
              value={capacity}
              onChange={(e)=>setCapacity(e.target.value)}
              required
            />

          </div>


          <div className="col-md-3">

            <button className="btn btn-primary w-100">
              Create Slot
            </button>

          </div>

        </div>

      </form>



      {/* SHOW SLOTS */}

      <h4>Existing Slots</h4>

      {slots.map(slot=>(
        
        <div key={slot._id} className="card p-3 mb-2">

          <p><b>Date:</b> {new Date(slot.date).toDateString()}</p>

          <p><b>Time:</b> {slot.time}</p>

          <p><b>Capacity:</b> {slot.capacity}</p>

          <p><b>Available:</b> {slot.available}</p>

        </div>

      ))}

    </div>

  );

}

export default AdminSlots;