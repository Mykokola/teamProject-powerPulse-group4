const express = require("express");
const router = express.Router();
const uploader = require("../middlewears/multer");
const controllers = require('../controllers/identification')



router.post("/signup",controllers.signup)

router.post("/login",controllers.login)
//PRIVATE
router.post("/calculateDailyMetrics",)

router.patch("/upload", uploader.single("avatar"), async (req, res,next) => {
    try{
        
        // res.send('File uploaded!');
        //test GOOGLE CLOUD
}catch(e){
        next(e)
    }
  });

router.get("/currentUser", )

router.post("/logout",)
//PRIVATE

module.exports = router