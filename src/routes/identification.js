const express = require("express");
const router = express.Router();
const upload = require("../middlewears/multer");
const controllers = require('../controllers/identification')
const authMiddleware = require('../middlewears/authMiddleware')
const cors = require("cors");

const corsOptions = {
    origin: 'https://teamproject-powerpulse-group4.onrender.com', // Встановлення конкретного джерела запитів
    methods: 'GET,POST,PATCH,DELETE,OPTIONS', // Дозволяємо лише GET і POST запити
    allowedHeaders: 'Content-Type, Authorization', // Дозволені заголовки
    optionsSuccessStatus: 200 // Дозволений статус для префлайт-запиту
  };
router.post("/signup", cors(corsOptions),controllers.signup)

router.post("/login",controllers.login)
//PRIVATE
router.post("/calculateDailyMetrics",authMiddleware,controllers.calculateDailyMetrics)

router.patch("/upload", authMiddleware,upload.single('avatar'),controllers.upload);

router.get("/currentUser", authMiddleware,controllers.currentUser)

router.post("/logout",authMiddleware,controllers.logout)
//PRIVATE

module.exports = router