const { ctrlWrapper } = require("../utils");
const statistic = require("../services/statistics");
const exerciseService = require("../services/exercises");
const requestError = require("../utils/requestError");

const getStatisticInfo = async (req, res, next) => {
  try {
    const clientsData = await statistic.allUsers();
    const exercisesData = await exerciseService.getAllExercises();
    const diaryData = await statistic.diaryDetails();

    if (!clientsData || !exercisesData || !diaryData) {
      requestError();
    }
    const usersCount = clientsData.length;
    const trainingsQuantity = exercisesData.length;

    // const totalBurnedCalories = diaryData.reduce((sum, item) => {
    //   const exerciseCalories = item.exerciseDone.reduce(
    //     (exerciseCaloriesSum, exercise) => exerciseCaloriesSum + exercise.burnedCalories,
    //     0
    //   );
    //   return sum + exerciseCalories;
    // }, 0);

    const totalBurnedCalories = diaryData.reduce((sum, item) => {
      return sum + item.toObject().caloriesBurned;
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
