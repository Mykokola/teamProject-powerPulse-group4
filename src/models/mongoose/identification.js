const {Schema,model} = require('mongoose')
const clientSchema = new Schema({
    email:{
        type:String,
        require:[true,'email is require']
    },
    name:{
        type:String,
        require:[true,'name is require']
    },
    password:{
        type:String,
        require:[true,'password is require']
    },
    avatar:{
        type:String,
        require:[false]
    }
})
const DailyMetricsSchema = new Schema({
    height:{
        type:Number,
        require:[true,"height is require"]
    },
    currentWeight:{
        type:Number,
        require:[true,'currentWeight is require']
    },
    desiredWeight:{
        type:Number,
        require:[true,'desiredWeight is require']
    },
    birthday:{
        type:Date,
        require:[true,'birthday is require']
    },
    blood:{
        type:Number,
        require:[true,'blood is require']
    },
    sex:{
        type:String,
        require:[true,'sex is require']
    },
    levelActivity:{
        type:Number,
        require:[true,'levelActivity is require']
    }
})
const clientModel = model('clients',clientSchema)
module.exports = clientModel
