const express = require("express");
const router = express.Router();
const controllers = require("../controllers/diary");
const authMiddleware = require("../middlewears/authMiddleware");

router.post("/save-product", authMiddleware, controllers.saveProduct);
router.post("/save-exercise", authMiddleware, controllers.saveExercise);
router.delete("/delete-product/:productId", authMiddleware, controllers.deleteProduct);
router.delete("/delete-exercise/:exerciseId", authMiddleware, controllers.deleteExercise);
router.get("/diary-date-info/:date", authMiddleware, controllers.dairyDateInfo);

module.exports = router;
