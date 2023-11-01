const {Schema,model} = require('mongoose')

const consumedProductSchema = new Schema({
    calories:{
        type:Number,
        required:true
    },
    category:{ 
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    groupBloodNotAllowed:{
        type:Boolean,
        required:true
    },
    burnedCalories:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    }

})

const exerciseDoneSchema = new Schema({
    bodyPart:{
        type:String,
        required:true
    },
    equipment:{
        type:String,
        required:true
    },
    gifUrl:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    target:{
        type:String,
        required:true
    },
    time:{
        type:Number,
        required:true
    },
    burnedCalories:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    }
})


const dairySchema = new Schema({
    clientId:{
        type:String,
        require:[true,'clientId is require']
    },
        consumedProduct:{
            type:[consumedProductSchema],
            default:[]
        },
        exerciseDone:{
            type:[exerciseDoneSchema],
            default:[]
        },
        BMR:{
            type:Number,
        },
        timeForSport:{
            type:Number,
            default:110
        },
        caloriesConsumed:{
            type:Number,
        },
        caloriesRest:{
            type:Number,
        },
        caloriesBurned :{
            type:Number,
        },
        restSport:{
            type:Number,
        }
        
},{ versionKey: false })

const dairyModel = model('dairyClients',dairySchema)


module.exports = {dairyModel}