const { ctrlWrapper } = require("../utils");
const createError = require("../utils/createError");
const ERROR_TYPES = require("../constants/ERROR_CODES");
const exerciseService = require("../services/exercises")
const getAllExercises = async (req, res) => {
   const {type} = req.params
   const filterExercisesOptions = {} 
   const filter = (await exerciseService.getFilterByOptions({name:type}))[0]?.filter
   if (!filter) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: "Not found",
    });
    throw error;
  }
   if(filter==='Equipment') filterExercisesOptions.equipment = type
   else if(filter==="Body parts")filterExercisesOptions.bodyPart = type
   else if(filter === 'Muscles')filterExercisesOptions.target = type
   const exercises = await exerciseService.getExerciseByOptions(filterExercisesOptions);
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
  const equipmentList = await exerciseService.getFilterByOptions({filter:'Equipment'})
  const bodyPartsList = await exerciseService.getFilterByOptions({filter:'Body parts'})
  const musculesList =  await exerciseService.getFilterByOptions({filter:'Muscles'})
  if (!details||!equipmentList||!bodyPartsList||!musculesList) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: "Not found",
    });
    throw error;
  }

  

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
