const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/exercises");
const authMiddleware = require("../middlewears/authMiddleware");

//PRIVATE
router.get("/all-types", authMiddleware, ctrl.getAlldetails);

router.get("/:type", authMiddleware, ctrl.getAllExercises);

//PRIVATE
module.exports = router;
