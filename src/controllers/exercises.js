const { ctrlWrapper } = require("../utils");
const createError = require("../utils/createError");
const ERROR_TYPES = require("../constants/ERROR_CODES");
const exerciseService = require("../services/exercises")
const getAllExercises = async (req, res) => {
  const exercises = await exerciseService.getAllExercises();
  if (!exercises) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: "Not found",
    });
    throw error;
  }
  res.json(exercises);
};

const getAlldetails = async (req, res) => {
  const details =  await exerciseService.getAllExercises()
  if (!details) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: "Not found",
    });
    throw error;
  }
  const bodyParts = details.map((obj) => obj.bodyPart);
  const bodyPartsList = [...new Set(bodyParts)];

  const equipment = details.map((obj) => obj.equipment);
  const equipmentList = [...new Set(equipment)];

  const muscules = details.map((obj) => obj.target);
  const musculesList = [...new Set(muscules)];

  const detailsList = {
    bodyParts: bodyPartsList,
    equipment: equipmentList,
    muscules: musculesList,
  };
  res.json(detailsList);
};

module.exports = {
  getAllExercises: ctrlWrapper(getAllExercises),
  getAlldetails: ctrlWrapper(getAlldetails),
};
