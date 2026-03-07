import { useEffect, useState } from "react";
import API from "../api/axios";

import { Bar, Line, Pie } from "react-chartjs-2";

import {
 Chart,
 CategoryScale,
 LinearScale,
 BarElement,
 LineElement,
 PointElement,
 ArcElement,
 Title,
 Tooltip,
 Legend
} from "chart.js";

Chart.register(
 CategoryScale,
 LinearScale,
 BarElement,
 LineElement,
 PointElement,
 ArcElement,
 Title,
 Tooltip,
 Legend
);

function AdminStats(){

 const [templeStats,setTempleStats] = useState([]);
 const [dailyStats,setDailyStats] = useState([]);
 const [slotStats,setSlotStats] = useState([]);

 const fetchStats = async () => {

  try{

   const templeRes = await API.get("/bookings/stats");
   const dayRes = await API.get("/bookings/stats/day");
   const slotRes = await API.get("/bookings/stats/slots");

   setTempleStats(templeRes.data);
   setDailyStats(dayRes.data);
   setSlotStats(slotRes.data);

  }catch(error){

   console.log(error);

  }

 };

 useEffect(()=>{
  fetchStats();
 },[]);


 const templeData = {

  labels: templeStats.map(s => s.name),

  datasets:[
   {
    label:"Bookings",
    data:templeStats.map(s => s.totalBookings),
    backgroundColor:"orange"
   }
  ]

 };


 const dailyData = {

  labels: dailyStats.map(s => s._id),

  datasets:[
   {
    label:"Bookings Per Day",
    data:dailyStats.map(s => s.totalBookings),
    borderColor:"blue",
    backgroundColor:"lightblue",
    tension:0.4
   }
  ]

 };


 const slotData = {

  labels: slotStats.map(s => s._id),

  datasets:[
   {
    label:"Slot Popularity",
    data:slotStats.map(s => s.totalBookings),
    backgroundColor:[
     "#FF6384",
     "#36A2EB",
     "#FFCE56",
     "#4BC0C0",
     "#9966FF"
    ]
   }
  ]

 };


 return(

 <div className="container mt-4">

  <h2>Admin Analytics Dashboard</h2>

  <div className="mt-4">

   <h4>Temple Booking Statistics</h4>

   <Bar data={templeData} />

  </div>


  <div className="mt-5">

   <h4>Bookings Per Day</h4>

   <Line data={dailyData} />

  </div>


  <div className="mt-5">

   <h4>Slot Popularity</h4>

   <Pie data={slotData} />

  </div>

 </div>

 );

}

export default AdminStats;