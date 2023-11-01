const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/products");
const authMiddleware = require("../middlewears/authMiddleware");

router.get("/", authMiddleware, ctrl.getAllProducts);
router.get("/categories", authMiddleware, ctrl.getAllCategories);

module.exports = router;
