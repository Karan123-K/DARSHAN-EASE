const Slot = require("../models/slot");


/* ===============================
   CREATE SLOT
================================ */

exports.createSlot = async (req, res) => {

  try {

    const { temple, date, time, capacity } = req.body;

    const slot = await Slot.create({
      temple,
      date,
      time,
      capacity,
      available: capacity
    });

    res.status(201).json(slot);

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }

};



/* ===============================
   GET ALL SLOTS (ADMIN DASHBOARD)
================================ */

exports.getSlots = async (req,res)=>{

  try{

    const slots = await Slot.find()
      .populate("temple","name location");

    res.json(slots);

  }catch(error){

    console.log(error);
    res.status(500).json({message:"Server error"});

  }

};



/* ===============================
   GET SLOTS BY TEMPLE
================================ */

exports.getSlotsByTemple = async (req, res) => {

  try {

    const slots = await Slot.find({
      temple: req.params.templeId
    });

    res.json(slots);

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }

};



/* ===============================
   UPDATE SLOT
================================ */

exports.updateSlot = async (req, res) => {

  try {

    const slot = await Slot.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(slot);

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }

};



/* ===============================
   DELETE SLOT
================================ */

exports.deleteSlot = async (req, res) => {

  try {

    await Slot.findByIdAndDelete(req.params.id);

    res.json({ message: "Slot deleted successfully" });

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }

};