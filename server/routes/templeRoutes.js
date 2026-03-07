const express = require("express");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {createTemple,getTemples,getTempleById} = require("../controllers/templeController");

const router = express.Router();

router.get("/",getTemples);

router.post("/",
protect,
authorize("organizer","admin"),
createTemple);

router.get("/:id",getTempleById);

module.exports = router;