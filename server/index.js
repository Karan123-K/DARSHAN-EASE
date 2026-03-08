const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/",( req, res ) => {
    res.send("Welcome to the Temple Booking API");
});

app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api/temples",require("./routes/templeRoutes"));
app.use("/api/slots",require("./routes/slotRoutes"));
app.use("/api/bookings",require("./routes/bookingRoutes"));

app.listen(process.env.PORT,()=>{
console.log(`Server running on port ${process.env.PORT}`);
});