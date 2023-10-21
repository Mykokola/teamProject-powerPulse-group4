const ERROR_CODES = require('../constants/ERROR_CODES')
const handlerError = (err,req,res,next) => {
    const status = err.type|| 500;
    res.status(status);
    res.json({
        status,
        message:err.message,
        data:err.data 
    })
}
module.exports = handlerError