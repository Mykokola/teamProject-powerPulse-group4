const express = require("express");
const router = express.Router();
const productModel = require("../models/mongoose/food");
router.get("/categories", (req, res, next) => {
  try {
    res.status(200).json({
      message: "you look is good",
    });
  } catch {}
});
router.get("/allowed-for-blood/", async (req, res, next) => {
  const users = await productModel.find();
  res.status(200).json({
    users,
  });
});
router.get("restricted-for-blood/:type", (req, res, next) => {});
module.exports = router;
