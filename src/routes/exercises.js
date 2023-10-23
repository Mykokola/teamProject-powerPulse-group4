const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/exercises");
const authMiddleware = require("../middlewears/authMiddleware");

//PRIVATE
router.get("/", authMiddleware, ctrl.getAllExercises);

router.get("/all-types", authMiddleware, ctrl.getAlldetails);
//PRIVATE
module.exports = router;
