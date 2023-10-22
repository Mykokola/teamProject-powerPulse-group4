const express = require("express");
const router = express.Router();
const controllers = require('../controllers/diary')
const authMiddleware = require('../middlewears/authMiddleware')
//PRIVATE
router.post('/save-product',authMiddleware,controllers.saveProduct)
router.post('/save-exercise',authMiddleware,controllers.saveExercise)
router.delete('/delete-product/:productId',authMiddleware,controllers.deleteProduct)
router.delete('/delete-exercise/:exercise',authMiddleware)
router.get('/info',authMiddleware)
//PRIVATE

module.exports = router;
