const express = require("express");
const router = express.Router();
const uploader = require("../middlewears/multer");
const controllers = require('../controllers/identification')
const authMiddleware = require('../middlewears/authMiddleware')


router.post("/signup",controllers.signup)

router.post("/login",controllers.login)
//PRIVATE
router.post("/calculateDailyMetrics",authMiddleware,controllers.calculateDailyMetrics)

router.patch("/upload", uploader.single("avatar"),controllers.upload);

router.get("/currentUser", authMiddleware,controllers.currentUser)

router.post("/logout",)
//PRIVATE

module.exports = router