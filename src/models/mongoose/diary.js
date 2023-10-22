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
        }
        
})

const dairyModel = model('dairyClients',dairySchema)


module.exports = {dairyModel}