const { exercisesAll } = require("../models/mongoose/exercises");

const getAllExercises = async () => {
    const exercises = await exercisesAll.find({})
    return exercises
}
const getExerciseById = async (_id) => {
    const exercise = await exercisesAll.find(_id)
    return exercise[0]
}
module.exports = {
    getAllExercises,
    getExerciseById
}