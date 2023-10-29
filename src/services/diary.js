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
const updateDiaryClient = async (_id,data) => {
  const client = await dairyModel.findOneAndUpdate({clientId:_id},data)
  return client
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
    const deleteProduct = await dairyModel.findOneAndUpdate(
        {clientId:_id},
        {$pull:{consumedProduct:{id:data}}},
      { upsert: true, new: true}
    )
    return deleteProduct
}

const deleteDiaryExercise = async (_id,data) => {
  const deleteExercise = await dairyModel.findOneAndUpdate(
    {clientId:_id},
    {$pull:{exerciseDone:{id:data}}},
  { upsert: true, new: true}
  )
  return deleteExercise
}


module.exports = {
    createDiary,
    updateById,
    addInDiaryProduct,
    addInDiaryExercise,
    deleteInDiaryProduct,
    currentClientDiary,
    updateInDiaryProduct,
    deleteDiaryExercise,
    updateDiaryClient
}