const Temple = require("../models/Temple");

exports.createTemple = async(req,res)=>{

    const temple = await Temple.create(req.body);

    res.json(temple);
};

exports.getTemples = async (req,res)=>{

 try{

  const temples = await Temple.find();

  res.json(temples);

 }catch(error){

  console.log(error);
  res.status(500).json({message:"Server error"});

 }

};

exports.getTempleById = async(req,res)=>{

    const temple = await Temple.findById(req.params.id);

    res.json(temple);
};