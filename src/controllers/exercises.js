const { ctrlWrapper, HttpError } = require("../utils");
const { exercisesAll, detailsAll } = require("../models/mongoose/exercises");

const getAllExercises = async (req, res) => {
  const exercises = await exercisesAll.find();
  if (!exercises) {
    throw HttpError(404, "Not found");
  }
  res.json(exercises);
};

const getAlldetails = async (req, res) => {
  const details = await detailsAll.find();
  if (!details) {
    throw HttpError(404, "Not found");
  }
  res.json(details);
};

module.exports = {
  getAllExercises: ctrlWrapper(getAllExercises),
  getAlldetails: ctrlWrapper(getAlldetails),
};
