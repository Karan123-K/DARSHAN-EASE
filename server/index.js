const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/users');
const Temple = require('./models/temples');
const Booking = require('./models/booking');
const Slot = require('./models/slot');

const router = require('./routes/authRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


connectDB();

app.get('/', async (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});