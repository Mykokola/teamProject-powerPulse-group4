const { string } = require('joi')
const {Schema,model} = require('mongoose')
const dairySchema = new Schema({
    clientId:{
        type:String,
        require:[true,'clientId is require']
    },
    clientDairy:{
        consumedProduct:{
            type:Array,
            default:[]
        },
        exerciseDone:{
            type:Array,
            default:[]
        }
    }
})

const dairyModel = model('dairy',dairySchema)

module.exports = dairyModel