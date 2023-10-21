const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/products");

//PRIVATE
router.get("/", ctrl.getAllProducts);
router.get("/categories", ctrl.getAllCategories);

// router.get("/restricted-for-blood/:type");

//PRIVATE
module.exports = router;
