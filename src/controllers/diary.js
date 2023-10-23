const createError = require('../utils/createError')
const diaryService = require('../services/diary')
const ERROR_TYPES = require('../constants/ERROR_CODES')
const validateSchema = require('../models/joi/diary')
const {nanoid} = require('nanoid')

const saveProduct = async (req,res,next) => {
    try{
        const product = req.body
        const {product:productId} = product
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
        const clientDairy = await diaryService.currentClientDiary({clientId:_id})
        const productInBd  =   clientDairy?.toObject().consumedProduct.find(elem => {
           return elem.product === productId && elem.date === product.date
        } );
        if(!productInBd){
            await diaryService.addInDiaryProduct(_id,{...product,id:nanoid()})
        }else{
            product.amount =   product.amount + productInBd.amount
            product.calories = product.calories + productInBd.calories
            product.id = productInBd.id
            await diaryService.updateInDiaryProduct(clientDairy.clientId,product.id,product)
            // console.log(productInBd)
        }
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
        await diaryService.addInDiaryExercise(_id,{...exercise,id:nanoid()})
        res.status(200).json({message:'exercise was add'})
    }catch(e){
        next(e)
    }
}

const deleteProduct = async (req,res,next) => {
    try{
        const {productId} = req.params
        const {_id} = req.user
        if(!productId){
            const error = createError(ERROR_TYPES.BAD_REQUEST,{
                message:'path is incorrect'
            })
            throw error
        }
        const currentClient  =   (await diaryService.currentClientDiary({clientId:_id})).toObject()
        const productCheck = currentClient.consumedProduct.some(elem => elem.id === productId);
        const {id} = currentClient
        if(!productCheck){
            const error = createError(ERROR_TYPES.NOT_FOUND,{
                message:'this product is not in consumedProduct'
            })
            throw error
        }
         await diaryService.deleteInDiaryProduct(_id,id)

        res.status(200).json({})
    }catch(e){
        next(e)
    }
}

const deleteExercise = async (req,res,next) => {
    try{

    }catch(e){
        next(e)
    }
}
module.exports = {
    saveProduct,
    saveExercise,
    deleteProduct,
    deleteExercise
}