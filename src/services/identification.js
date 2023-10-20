const clientModel = require('../models/mongoose/identification')
const signup = async (data) => {
    const client = await new clientModel(data)
    client.save()
    return client
}

const allClients = async () => {
    const clients = await clientModel.find({})
    return clients
}

const getClientByOptions = async (option) => {
    const client =  await clientModel.find(option)
    return client[0]
}
module.exports = {
    signup,
    allClients,
    getClientByOptions
}