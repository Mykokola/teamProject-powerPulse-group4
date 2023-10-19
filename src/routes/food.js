const express = require("express");
const router = express.Router()

router.get('/user',(req,res,next) => {
    try{
      res.status(200).json({
        message:'you look is good'
      })
    }catch{
  
    }
  }
)
module.exports = router