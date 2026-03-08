const mongoose = require("mongoose");

const templeSchema = new mongoose.Schema({

 name:{
  type:String,
  required:true
 },

 location:{
  type:String,
  required:true
 },

 coverImage:{
  type : String
 },

 description:{
  type:String
 },

 organizerId:{
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required:true
 },

 slotsAvailable:{
  type: Number,
  default: 0
 },

 numberOfSeats:{
  type: Number,
  default: 0
 }

},{timestamps:true});

module.exports = mongoose.models.Temple || mongoose.model("Temple", templeSchema);