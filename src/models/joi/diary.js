const Joi = require('joi')
const productPattern = Joi.object().keys({
    product:Joi.string().required(),
    date:Joi.date().max('now').iso().optional(),
    amount:Joi.number().min(1).required(),
    calories:Joi.number().min(1).required()
})
const exercisePattern = Joi.object().keys({
    exercise:Joi.string().required(),
    date:Joi.date().max('now').iso().optional(),
    time:Joi.number().min(1).required(),
    calories:Joi.number().min(1).required()
})
const datePattern = Joi.object().keys({
    date:Joi.date().max('now').iso().required()
})
module.exports = {productPattern,exercisePattern,datePattern}