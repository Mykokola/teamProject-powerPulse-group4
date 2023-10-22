const createError = require('../utils/createError')
const diaryService = require('../services/diary')
const ERROR_TYPES = require('../constants/ERROR_CODES')
const validateSchema = require('../models/joi/diary')
const saveProduct = async (req,res,next) => {
    try{
        const product = req.body
        const {_id} = req.user
        if(validateSchema.productPattern.validate(product).error){
            const error = createError(ERROR_TYPES.BAD_REQUEST,{
                message:'bady is incorrect'
            })
            throw error
        }
        if(!product.date){
            let date = new Date().toISOString().split('T')[0]
            product.date = date
        }
      await diaryService.addInDiaryProduct(_id,product)

        res.status(200).json({message:'product was add'})
    }catch(e){
        next(e)
    }
}
const saveExercise = async (req,res,next) => {
    try{
        const exercise = req.body
        const {_id} = req.user
        if(validateSchema.exercisePattern.validate(exercise).error){
            const error = createError(ERROR_TYPES.BAD_REQUEST,{
                message:'bady is incorrect'
            })
            throw error
        }
        if(!exercise.date){
            let date = new Date().toISOString().split('T')[0]
            exercise.date = date
        }
        await diaryService.addInDiaryExercise(_id,exercise)
        res.status(200).json({message:'exercise was add'})
    }catch(e){
        next(e)
    }
}
module.exports = {
    saveProduct,
    saveExercise
}