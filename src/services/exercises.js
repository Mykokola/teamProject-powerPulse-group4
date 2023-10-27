const { exercisesAll,detailsAll } = require("../models/mongoose/exercises");

const getAllExercises = async () => {
    const exercises = await exercisesAll.find({})
    return exercises
}
const getFilterByOptions = async (options) => { 
    const filter = await detailsAll.find(options)
    return filter
}
const getExerciseById = async (_id) => {
    const exercise = await exercisesAll.find(_id)
    return exercise[0]
}
module.exports = {
    getAllExercises,
    getExerciseById,
    getFilterByOptions
}