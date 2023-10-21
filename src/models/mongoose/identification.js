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
    },
    height:{
        type:Number,
    },
    currentWeight:{
        type:Number,
    },
    desiredWeight:{
        type:Number,
    },
    birthday:{
        type:Date,
    },
    blood:{
        type:Number,
    },
    sex:{
        type:String,
    },
    levelActivity:{
        type:Number,
    }
})
const DailyMetricsSchema = new Schema({
   
})
const clientModel = model('clients',clientSchema)
module.exports = clientModel
