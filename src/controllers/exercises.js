const { ctrlWrapper } = require("../utils");
const createError = require("../utils/createError");
const ERROR_TYPES = require("../constants/ERROR_CODES");
const { exercisesAll, detailsAll } = require("../models/mongoose/exercises");

const getAllExercises = async (req, res) => {
  const exercises = await exercisesAll.find();
  if (!exercises) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: "Not found",
    });
    throw error;
  }
  res.json(exercises);
};

const getAlldetails = async (req, res) => {
  const details = await detailsAll.find();
  if (!details) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: "Not found",
    });
    throw error;
  }
  res.json(details);
};

module.exports = {
  getAllExercises: ctrlWrapper(getAllExercises),
  getAlldetails: ctrlWrapper(getAlldetails),
};
