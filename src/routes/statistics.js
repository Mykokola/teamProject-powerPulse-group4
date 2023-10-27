const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/statistics");
//PUBLIC
router.get("/", ctrl.getStatisticInfo);
//PUBLIC
module.exports = router;
