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

 description:{
  type:String
 }

},{timestamps:true});

module.exports = mongoose.models.Temple || mongoose.model("Temple", templeSchema);