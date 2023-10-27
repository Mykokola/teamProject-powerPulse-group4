const { ctrlWrapper } = require("../utils");
const createError = require("../utils/createError");
const ERROR_TYPES = require("../constants/ERROR_CODES");
const statistic = require("../services/statistics");
const exerciseService = require("../services/exercises");

const requestError = (message) => {
  const error = createError(ERROR_TYPES.NOT_FOUND, {
    message: message || "Not found",
  });
  throw error;
};

const getRegisteredUsersCount = async () => {
  const clients = await statistic.allUsers();
  if (!clients) {
    requestError();
  }
  return clients;
};

const getAllDiaryDetails = async () => {
  const diaryDetails = await statistic.diaryDetails();
  if (!diaryDetails) {
    requestError();
  }
  return diaryDetails;
};

const getAllExercisesCount = async () => {
  const exercises = await exerciseService.getAllExercises();
  if (!exercises) {
    requestError();
  }
  return exercises;
};

const getStatisticInfo = async (req, res, next) => {
  try {
    const clientsData = await getRegisteredUsersCount();
    const exercisesData = await getAllExercisesCount();
    const diaryData = await getAllDiaryDetails();

    if (!clientsData && !exercisesData && !diaryData) {
      requestError();
    }
    const usersCount = clientsData.length;
    const trainingsQuantity = exercisesData.length;
    const totalBurnedCalories = diaryData.reduce((sum, item) => {
      const exerciseCalories = item.exerciseDone.reduce(
        (exerciseCaloriesSum, exercise) => exerciseCaloriesSum + exercise.calories,
        0
      );
      return sum + exerciseCalories;
    }, 0);

    const totalTrainingHours = diaryData.reduce((sum, item) => {
      const exerciseHours = item.exerciseDone.reduce(
        (exerciseHoursSum, exercise) => exerciseHoursSum + exercise.time,
        0
      );
      return sum + exerciseHours;
    }, 0);

    const totalUsersExercisesCount = diaryData.reduce((sum, item) => {
      return sum + item.exerciseDone.length;
    }, 0);

    res.json({
      trainingsQuantity: trainingsQuantity,
      burnedAllUsersCalories: totalBurnedCalories,
      registeredUsersCount: usersCount,
      spentAllUsersTime: totalTrainingHours,
      totalUsersExercisesCount: totalUsersExercisesCount,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStatisticInfo: ctrlWrapper(getStatisticInfo),
};
