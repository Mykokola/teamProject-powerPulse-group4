const createError = require('../utils/createError')
const diaryService = require('../services/diary')
const saveProduct = async (req,res,next) => {
    try{
        const {_id} = req.user
        const client = await diaryService.findDiaryByOption({_id})
        console.log(client)
        res.status(200).json({})
    }catch(e){
        next(e)
    }
}

module.exports = {
    saveProduct
}