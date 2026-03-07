const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");



/* =========================
   REGISTER USER
========================= */

exports.register = async (req,res)=>{

 try{

  const {name,email,password} = req.body;

  // VALIDATION
  if(!name || !email || !password){
   return res.status(400).json({
    message:"All fields are required"
   });
  }

  // CHECK EXISTING USER
  const existingUser = await User.findOne({email});

  if(existingUser){
   return res.status(400).json({
    message:"User already exists"
   });
  }

  // HASH PASSWORD
  const hashedPassword = await bcrypt.hash(password,10);

  // CREATE USER
  const user = await User.create({
   name,
   email,
   password:hashedPassword
  });

  // GENERATE TOKEN
  const token = generateToken(user);

  res.status(201).json({
   token,
   user:{
    id:user._id,
    name:user.name,
    email:user.email
   }
  });

 }catch(error){

  console.log(error);
  res.status(500).json({message:"Server Error"});

 }

};



/* =========================
   LOGIN USER
========================= */

exports.login = async (req,res)=>{

 try{

  const {email,password} = req.body;

  // VALIDATION
  if(!email || !password){
   return res.status(400).json({
    message:"Email and password required"
   });
  }

  // FIND USER
  const user = await User.findOne({email});

  if(!user){
   return res.status(400).json({
    message:"Invalid credentials"
   });
  }

  // CHECK PASSWORD
  const isMatch = await bcrypt.compare(password,user.password);

  if(!isMatch){
   return res.status(400).json({
    message:"Invalid credentials"
   });
  }

  // TOKEN
  const token = generateToken(user);

  res.json({
   token,
   user:{
    id:user._id,
    name:user.name,
    email:user.email
   }
  });

 }catch(error){

  console.log(error);
  res.status(500).json({message:"Server Error"});

 }

};