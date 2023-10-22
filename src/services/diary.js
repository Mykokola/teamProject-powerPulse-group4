const {dairyModel} = require("../models/mongoose/diary")
const createDiary = async (data) => {
    const client = await new dairyModel(data)
    client.save()
    return client
}

const findDiaryByOption = async (option) => {
    const clientDairy = await dairyModel.find(option)
    return clientDairy[0]
}

const updateById = async (_id,data) => {
    const updateClient = await dairyModel.findByIdAndUpdate({_id},data)
    return updateClient
}

const addInDiaryProduct = async (_id,data) => {
    const updateClient = await dairyModel.findOneAndUpdate(
        {clientId:_id},
        {$push:{consumedProduct:data}},
      { upsert: true, new: true}
    )
    return updateClient
}

const addInDiaryExercise = async (_id,data) => {
    const updateClient = await dairyModel.findOneAndUpdate(
        {clientId:_id},
        {$push:{exerciseDone:data}},
      { upsert: true, new: true}
    )
    return updateClient
}
module.exports = {
    createDiary,
    findDiaryByOption,
    updateById,
    addInDiaryProduct,
    addInDiaryExercise
}