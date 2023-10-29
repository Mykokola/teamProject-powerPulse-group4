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
            default:[]
        },
        timeForSport:{
            type:Number,
            default:110
        },
        caloriesConsumed:{
            type:Number,
            default:[]
        },
        caloriesRest:{
            type:Number,
            default:[]
        },
        caloriesBurned :{
            type:Number,
            default:[]
        },
        restSport:{
            type:Number,
            default:[]
        }
        
},{ versionKey: false })

const dairyModel = model('dairyClients',dairySchema)


module.exports = {dairyModel}