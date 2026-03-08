const Temple = require("../models/temple");

exports.createTemple = async(req,res)=>{

    try {
        const temple = await Temple.create({
            ...req.body,
            organizerId: req.user.id
        });
        res.json(temple);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error creating temple"});
    }
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

exports.updateTemple = async (req, res) => {
    try {
        const temple = await Temple.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!temple) {
            return res.status(404).json({ message: "Temple not found" });
        }

        res.json(temple);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteTemple = async (req, res) => {
    try {
        const temple = await Temple.findByIdAndDelete(req.params.id);

        if (!temple) {
            return res.status(404).json({ message: "Temple not found" });
        }

        res.json({ message: "Temple deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};