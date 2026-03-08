const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

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

router.post("/", protect, authorize("admin", "organizer"), createSlot);



/* ===============================
   GET ALL SLOTS (ADMIN DASHBOARD)
================================ */

router.get("/", protect, authorize("admin", "organizer"), getSlots);



/* ===============================
   GET SLOTS BY TEMPLE
================================ */

router.get("/:templeId", getSlotsByTemple);



/* ===============================
   UPDATE SLOT
================================ */

router.put("/:id", protect, authorize("admin", "organizer"), updateSlot);



/* ===============================
   DELETE SLOT
================================ */

router.delete("/:id", protect, authorize("admin", "organizer"), deleteSlot);



module.exports = router;