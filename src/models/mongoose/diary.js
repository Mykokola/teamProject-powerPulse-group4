const {Schema,model} = require('mongoose')
const dairySchema = new Schema({
    clientId:{
        type:String,
        require:[true,'clientId is require']
    },
        consumedProduct:{
            type:Array,
            default:[]
        },
        exerciseDone:{
            type:Array,
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