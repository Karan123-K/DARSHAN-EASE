const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createSlot,
  getSlots,
  getSlotsByTemple,
  updateSlot,
  deleteSlot
} = require("../controllers/slotController");



/* ===============================
   CREATE SLOT
================================ */

router.post("/", protect, createSlot);



/* ===============================
   GET ALL SLOTS (ADMIN DASHBOARD)
================================ */

router.get("/", protect, getSlots);



/* ===============================
   GET SLOTS BY TEMPLE
================================ */

router.get("/:templeId", getSlotsByTemple);



/* ===============================
   UPDATE SLOT
================================ */

router.put("/:id", protect, updateSlot);



/* ===============================
   DELETE SLOT
================================ */

router.delete("/:id", protect, deleteSlot);



module.exports = router;