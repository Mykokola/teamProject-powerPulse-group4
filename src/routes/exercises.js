const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/exercises");

//PRIVATE
router.get("/", ctrl.getAllExercises);

router.get("/all-types", ctrl.getAlldetails);
//PRIVATE
module.exports = router;
