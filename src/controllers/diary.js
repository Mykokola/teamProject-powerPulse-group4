const createError = require("../utils/createError");
const diaryService = require("../services/diary");
const productService = require("../services/products");
const exerciseService = require("../services/exercises");
const ERROR_TYPES = require("../constants/ERROR_CODES");
const validateSchema = require("../models/joi/diary");
const { nanoid } = require("nanoid");

const saveProduct = async (req, res, next) => {
  try {
    const product = req.body;
    const { _id, blood } = req.user;
    if (validateSchema.productPattern.validate(product).error) {
      const error = createError(ERROR_TYPES.BAD_REQUEST, {
        message: validateSchema.productPattern.validate(product).error.details[0].message,
      });
      throw error;
    }
    if (!product.date) {
      let date = new Date().toISOString().split("T")[0];
      product.date = date;
    }
    let productsDB = await productService.getProductById({
      _id: product.product,
    });
    if (!productsDB) {
      const error = createError(ERROR_TYPES.NOT_FOUND, {
        message: "product is not a found",
      });
      throw error;
    }
    productsDB = productsDB.toObject();
    productsDB.calories = product.calories;
    delete productsDB.weight;
    productsDB.amount = product.amount;
    productsDB.date = product.date;
    productsDB.groupBloodNotAllowed = productsDB.groupBloodNotAllowed[blood];
    await diaryService.addInDiaryProduct(_id, {
      ...productsDB,
      id: nanoid(),
    });

    res.status(200).json({ message: "product was add" });
  } catch (e) {
    next(e);
  }
};

const saveExercise = async (req, res, next) => {
  try {
    const exercise = req.body;
    const { _id } = req.user;
    if (validateSchema.exercisePattern.validate(exercise).error) {
      const error = createError(ERROR_TYPES.BAD_REQUEST, {
        message: validateSchema.exercisePattern.validate(exercise).error.details[0].message,
      });
      throw error;
    }
    if (!exercise.date) {
      const date = new Date().toISOString().split("T")[0];
      exercise.date = date;
    }
    let exercisesDB = await exerciseService.getExerciseById({
      _id: exercise.exercise,
    });
    if (!exercisesDB) {
      const error = createError(ERROR_TYPES.NOT_FOUND, {
        message: "exercise is not a found",
      });
      throw error;
    }
    exercisesDB = exercisesDB.toObject();
    exercisesDB.time = exercise.time;
    delete exercisesDB.burnedCalories;
    exercisesDB.burnedCalories = exercise.calories;
    exercisesDB.date = exercise.date;
    await diaryService.addInDiaryExercise(_id, {
      ...exercisesDB,
      id: nanoid(),
    });
    res.status(200).json({ message: "exercise was add" });
  } catch (e) {
    next(e);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { _id } = req.user;
    if (!productId) {
      const error = createError(ERROR_TYPES.BAD_REQUEST, {
        message: "you must pass an productId route parameter that is equal to the product ID",
      });
      throw error;
    }
    const currentClient = (await diaryService.currentClientDiary({ clientId: _id })).toObject();
    const productCheck = currentClient.consumedProduct.some((elem) => elem.id === productId);
    if (!productCheck) {
      const error = createError(ERROR_TYPES.NOT_FOUND, {
        message: "this product is not in consumedProduct",
      });
      throw error;
    }
    await diaryService.deleteInDiaryProduct(_id, productId);

    res.status(200).json({ message: "produc was delete" });
  } catch (e) {
    next(e);
  }
};

const deleteExercise = async (req, res, next) => {
  try {
    const { exerciseId } = req.params;
    const { _id } = req.user;
    if (!exerciseId) {
      const error = createError(ERROR_TYPES.BAD_REQUEST, {
        message: "you must pass an exerciseId route parameter that is equal to the exercise ID",
      });
      throw error;
    }
    const currentClient = (await diaryService.currentClientDiary({ clientId: _id })).toObject();
    const exerciseCheck = currentClient.exerciseDone.some((elem) => elem.id === exerciseId);
    if (!exerciseCheck) {
      const error = createError(ERROR_TYPES.NOT_FOUND, {
        message: "this exercise is not in exerciseDone",
      });
      throw error;
    }
    await diaryService.deleteDiaryExercise(_id, exerciseId);

    res.status(200).json({ message: "exercise was delete" });
  } catch (e) {
    next(e);
  }
};

const dairyDateInfo = async (req, res, next) => {
  try {
    const option = req.params;
    const { _id, BMR, timeForSport } = req.user;

    if (validateSchema.datePattern.validate(option).error) {
      const error = createError(ERROR_TYPES.BAD_REQUEST, {
        message: validateSchema.datePattern.validate(option).error.details[0].message,
      });
      throw error;
    }
    const currentClientDiary = await diaryService.currentClientDiary({
      clientId: _id,
    });
    if (!currentClientDiary) {
      const error = createError(ERROR_TYPES.NOT_FOUND, {
        message: "user is not a found",
      });
      throw error;
    }

    const dateFilter = (elem) => elem.date === option.date;
    const filteredConsumedProduct = currentClientDiary.consumedProduct.filter(dateFilter);
    const filteredExerciseDone = currentClientDiary.exerciseDone.filter(dateFilter);

    const caloriesConsumed = filteredConsumedProduct.reduce(
      (sum, currentValue) => sum + currentValue.calories,
      0
    );
    const caloriesBurned = filteredExerciseDone.reduce(
      (sum, currentValue) => sum + currentValue.burnedCalories,
      0
    );
    const restSport = filteredExerciseDone.reduce(
      (sum, currentValue) => sum + currentValue.time,
      0
    );
    const caloriesRest = BMR - caloriesConsumed;

    const dataClientDiary = {
      BMR,
      timeForSport,
      caloriesConsumed,
      caloriesRest,
      caloriesBurned,
      restSport,
    };

    await diaryService.updateDiaryClient(_id, { ...dataClientDiary });

    const updateUser = await diaryService.currentClientDiary({
      clientId: _id,
    });

    updateUser.consumedProduct = filteredConsumedProduct;
    updateUser.exerciseDone = filteredExerciseDone;

    res.status(200).json({ diary: updateUser });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  saveProduct,
  saveExercise,
  deleteProduct,
  deleteExercise,
  dairyDateInfo,
};
