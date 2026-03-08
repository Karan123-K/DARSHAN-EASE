const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const bookingController = require("../controllers/bookingController");


// CREATE BOOKING
router.post("/", protect, bookingController.createBooking);


// USER BOOKINGS
router.get("/user", protect, bookingController.getUserBookings);


// ADMIN/ORGANIZER BOOKINGS
router.get(
 "/admin",
 protect,
 authorize("admin", "organizer"),
 bookingController.getAllBookings
);


// CANCEL BOOKING
router.delete("/:id", protect, bookingController.cancelBooking);


// =====================
// ANALYTICS ROUTES
// =====================

router.get(
 "/stats",
 protect,
 authorize("admin"),
 bookingController.getBookingStats
);

router.get(
 "/stats/day",
 protect,
 authorize("admin"),
 bookingController.getBookingsPerDay
);

router.get(
 "/stats/slots",
 protect,
 authorize("admin"),
 bookingController.getSlotPopularity
);


module.exports = router;