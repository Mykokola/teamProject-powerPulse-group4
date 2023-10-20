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

const clientModel = model('clients',clientSchema)

module.exports = clientModel
