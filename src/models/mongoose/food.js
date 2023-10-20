const {Schema,model} = require('mongoose')
const producSchema = new Schema({
    weight:{
        type:Number,
        require:[true,'weight is require']
    },
    calories:{
        type:Number,
        require:[true,'calories is require']
    },
    category:{
        type:String,
        require:[true,'category is require']
    },
    title:{
        type:String,
        require:[true,'title is require']
    },
    groupBloodNotAllowed:{
        type:Object,
        require:[true,'groupBloodNotAllowed is require']
    }
})

const productModel = model('products',producSchema)

module.exports = productModel