const express = require("express");
const router = express.Router();
const controllers = require('../controllers/diary')
const authMiddleware = require('../middlewears/authMiddleware')
//PRIVATE
router.post('/save-product',authMiddleware,controllers.saveProduct)
router.post('/save-exercise',authMiddleware,controllers.saveExercise)
router.delete('/delete-product')
router.delete('/delete-exercise')
router.get('/info')
//PRIVATE

module.exports = router;
