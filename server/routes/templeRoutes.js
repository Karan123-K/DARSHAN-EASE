const express = require("express");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {createTemple,getTemples,getTempleById,updateTemple,deleteTemple} = require("../controllers/templeController");

const router = express.Router();

router.get("/",getTemples);

router.post("/",
protect,
authorize("admin", "organizer"),
createTemple);

router.get("/:id",getTempleById);

router.put("/:id",
protect,
authorize("admin", "organizer"),
updateTemple);

router.delete("/:id",
protect,
authorize("admin", "organizer"),
deleteTemple);

module.exports = router;