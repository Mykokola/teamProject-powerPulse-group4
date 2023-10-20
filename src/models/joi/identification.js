const Joi = require('joi')
const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
const emailJoi = Joi.string().min(3).max(30).regex(emailPattern).required()
const passwordJoi = Joi.string().alphanum().min(6).max(30).required()
const registerSchema = Joi.object().keys({
    email:emailJoi,
    name:Joi.string().required(),
    password:passwordJoi
})
const loginSchema = Joi.object().keys({
    email:emailJoi,
    password:passwordJoi
})
module.exports = {
    registerSchema,
    loginSchema
}