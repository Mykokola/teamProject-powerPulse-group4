const express = require("express");
const router = express.Router();
const productModel = require('../models/mongoose/food')
//PRIVATE
router.get("/categories",async (req,res,next) => {
    // try{   
        
    //     const client = await new productModel({name:'hihih',items:[2]})
    //     client.save()
    //     const response = await productModel.find()
    //     console.log(response)
    //     res.status(200).json({
    //         response
    //     })
    // }catch(e){
    //     next(e)
    // }
});

router.get("/restricted-for-blood/:type",);

//PRIVATE
module.exports = router;
