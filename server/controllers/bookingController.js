const Booking = require("../models/booking");
const Slot = require("../models/slot");
const Temple = require("../models/temple");

const QRCode = require("qrcode");


/* ===============================
   CREATE BOOKING + QR TICKET
================================ */

exports.createBooking = async (req,res)=>{

 try{

  const {slotId,templeId} = req.body;

  const slot = await Slot.findById(slotId);

  if(!slot){
   return res.status(404).json({message:"Slot not found"});
  }

  if(slot.available <= 0){
   return res.status(400).json({message:"Slot full"});
  }

  const booking = await Booking.create({
   user:req.user.id,
   temple:templeId,
   slot:slotId
  });

  slot.available -= 1;
  await slot.save();


  const qrData = {
   bookingId: booking._id,
   temple: templeId,
   slot: slotId,
   user: req.user.id
  };

  const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

  booking.qrCode = qrCode;
  await booking.save();


  res.status(201).json({
   booking,
   qrCode
  });

 }catch(error){

  console.log(error);
  res.status(500).json({message:"Server error"});

 }

};



/* ===============================
   USER BOOKINGS
================================ */

exports.getUserBookings = async (req,res)=>{

 try{

  const bookings = await Booking.find({
   user:req.user.id
  })
  .populate("temple","name location")
  .populate("slot","date time capacity available");

  res.json(bookings);

 }catch(error){

  console.log(error);
  res.status(500).json({message:"Server error"});

 }

};



/* ===============================
   ADMIN GET BOOKINGS
================================ */

exports.getAllBookings = async (req,res)=>{

 try{

  const bookings = await Booking.find()
  .populate("user","name email")
  .populate("temple","name location")
  .populate("slot","date time");

  res.json(bookings);

 }catch(error){

  console.log(error);
  res.status(500).json({message:"Server error"});

 }

};



/* ===============================
   CANCEL BOOKING
================================ */

exports.cancelBooking = async (req,res)=>{

 try{

  const booking = await Booking.findById(req.params.id);

  if(!booking){
   return res.status(404).json({message:"Booking not found"});
  }

  const slot = await Slot.findById(booking.slot);

  if(slot){
   slot.available += 1;
   await slot.save();
  }

  await Booking.findByIdAndDelete(req.params.id);

  res.json({message:"Booking cancelled successfully"});

 }catch(error){

  console.log(error);
  res.status(500).json({message:"Server error"});

 }

};



/* ===============================
   TEMPLE BOOKING STATS
================================ */

exports.getBookingStats = async (req,res)=>{

 try{

  const temples = await Temple.find();

  const stats = await Booking.aggregate([
   {
    $group:{
     _id:"$temple",
     totalBookings:{ $sum:1 }
    }
   }
  ]);

  const bookingMap = {};

  stats.forEach(s=>{
   bookingMap[s._id] = s.totalBookings;
  });

  const result = temples.map(t=>({
   name:t.name,
   totalBookings: bookingMap[t._id] || 0
  }));

  res.json(result);

 }catch(error){

  console.log(error);
  res.status(500).json({message:"Server error"});

 }

};



/* ===============================
   BOOKINGS PER DAY
================================ */

exports.getBookingsPerDay = async (req,res)=>{

 try{

  const stats = await Booking.aggregate([
   {
    $group:{
     _id:{
      $dateToString:{
       format:"%Y-%m-%d",
       date:"$createdAt"
      }
     },
     totalBookings:{ $sum:1 }
    }
   },
   { $sort:{ _id:1 } }
  ]);

  res.json(stats);

 }catch(error){

  console.log(error);
  res.status(500).json({message:"Server error"});

 }

};



/* ===============================
   SLOT POPULARITY
================================ */

exports.getSlotPopularity = async (req,res)=>{

 try{

  const stats = await Booking.aggregate([

   {
    $lookup:{
     from:"slots",
     localField:"slot",
     foreignField:"_id",
     as:"slot"
    }
   },

   { $unwind:"$slot" },

   {
    $group:{
     _id:"$slot.time",
     totalBookings:{ $sum:1 }
    }
   }

  ]);

  res.json(stats);

 }catch(error){

  console.log(error);
  res.status(500).json({message:"Server error"});

 }

};