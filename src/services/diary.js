const {dairyModel} = require("../models/mongoose/diary")
const createDiary = async (data) => {
    const client = await new dairyModel(data)
    client.save()
    return client
}

const currentClientDiary = async (option) => {
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

const updateInDiaryProduct = async (clientId, productId, updatedData) => {
    const updateClient = await dairyModel.findOneAndUpdate(
      { clientId: clientId, 'consumedProduct.id': productId }, // Знайдіть елемент з вказаним _id
      { $set: { 'consumedProduct.$': updatedData } }, // Оновіть елемент масиву exerciseDone
      { new: true }
    );
    console.log(updateClient)
    return updateClient;
  };

const addInDiaryExercise = async (_id,data) => {
    const updateClient = await dairyModel.findOneAndUpdate(
        {clientId:_id},
        {$push:{exerciseDone:data}},
      { upsert: true, new: true}
    )
    return updateClient
}

const deleteInDiaryProduct = async (_id,data) => {
    const deleteClient = await dairyModel.findOneAndUpdate(
        {clientId:_id},
        {$pull:{consumedProduct:{id:data}}},
      { upsert: true, new: true}
    )
    return deleteClient
}


module.exports = {
    createDiary,
    updateById,
    addInDiaryProduct,
    addInDiaryExercise,
    deleteInDiaryProduct,
    currentClientDiary,
    updateInDiaryProduct
}