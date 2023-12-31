const express = require("express");
const router = express.Router();
const upload = require("../middlewears/multer");
const controllers = require("../controllers/identification");
const authMiddleware = require("../middlewears/authMiddleware");
const cors = require("cors");

router.post("/signup", controllers.signup);

router.post("/login", controllers.login);

router.post("/calculateDailyMetrics", authMiddleware, controllers.calculateDailyMetrics);

router.patch("/upload", authMiddleware, upload.single("avatar"), controllers.upload);

router.get("/currentUser", authMiddleware, controllers.currentUser);

router.post("/logout", authMiddleware, controllers.logout);

module.exports = router;
