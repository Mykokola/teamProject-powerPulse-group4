const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/products");
const authMiddleware = require("../middlewears/authMiddleware");

//PRIVATE
router.get("/", authMiddleware, ctrl.getAllProducts);
router.get("/categories", authMiddleware, ctrl.getAllCategories);
// router.get("/filter-product",authMiddleware, ctrl.filterProduct)
router.get("/available-blood-products/:type", authMiddleware, ctrl.getAvailableProducts); //:true or false

//PRIVATE
module.exports = router;
