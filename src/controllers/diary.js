const createError = require("../utils/createError");
const diaryService = require("../services/diary");
const productService = require("../services/products")
const exerciseService = require("../services/exercises")
const ERROR_TYPES = require("../constants/ERROR_CODES");
const validateSchema = require("../models/joi/diary");
const { nanoid } = require("nanoid");

const saveProduct = async (req, res, next) => {
  try {
    const product = req.body;
    const { _id ,blood} = req.user;
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
    let productFromBd = await productService.getProductById({_id:product.product})
    if(!productFromBd){
      const error = createError(ERROR_TYPES.NOT_FOUND,{
        message:"product is not a found"
      })
      throw error
    }
    productFromBd= productFromBd.toObject()
    productFromBd.calories  = product.calories
    delete productFromBd.weight
    productFromBd.amount = product.amount
    productFromBd.date = product.date
    productFromBd.groupBloodNotAllowed = productFromBd.groupBloodNotAllowed[blood]
    await diaryService.addInDiaryProduct(_id, { ...productFromBd, id: nanoid() });

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
      let date = new Date().toISOString().split("T")[0];
      exercise.date = date;
    }
    let exerciseFromBd = await exerciseService.getExerciseById({_id:exercise.exercise})
    if(!exerciseFromBd){
      const error = createError(ERROR_TYPES.NOT_FOUND,{
        message:"exercise is not a found"
      })
      throw error
    }
    exerciseFromBd = exerciseFromBd.toObject()
    exerciseFromBd.time = exercise.time
    delete exerciseFromBd.burnedCalories
    exerciseFromBd.burnedCalories = exercise.calories
    exerciseFromBd.date = exercise.date
    await diaryService.addInDiaryExercise(_id, {...exerciseFromBd,id: nanoid() });
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
        message: 'you must pass an productId route parameter that is equal to the product ID',
      });
      throw error;
    }
    const currentClient = (
      await diaryService.currentClientDiary({ clientId: _id })
    ).toObject();
    const productCheck = currentClient.consumedProduct.some(
      (elem) => elem.id === productId
    );
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
        message: 'you must pass an exerciseId route parameter that is equal to the exercise ID',
      });
      throw error;
    }
    const currentClient = (
      await diaryService.currentClientDiary({ clientId: _id })
    ).toObject();
    const exerciseCheck = currentClient.exerciseDone.some(
      (elem) => elem.id === exerciseId
    );
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
    const { _id,BMR,timeForSport} = req.user;

    if (validateSchema.datePattern.validate(option).error) {
      const error = createError(ERROR_TYPES.BAD_REQUEST, {
        message: validateSchema.datePattern.validate(option).error.details[0].message,
      });
      throw error;
    }
    const currentClientDiary = await diaryService.currentClientDiary({
      clientId: _id,
    });
    if(!currentClientDiary){
      const error = createError(ERROR_TYPES.NOT_FOUND,{
        message:"user is not a found"
      })
      throw error
    }

      const caloriesConsumed = currentClientDiary.consumedProduct.filter(
        (elem) => elem.date == option.date
      ).reduce((accumulator, currentValue) => {
        return accumulator + currentValue.calories
      },0);
      const caloriesRest = BMR - caloriesConsumed
      const  caloriesBurned = currentClientDiary.exerciseDone.filter(
    (elem) => elem.date == option.date
  ).reduce((accumulator, currentValue) => {
        return accumulator + currentValue.burnedCalories
      },0);
      const restSport = currentClientDiary.exerciseDone.filter(
        (elem) => elem.date == option.date
      ).reduce((accumulator, currentValue) => {
        return accumulator + currentValue.time
      },0);
      const dataClientDiary = {BMR,timeForSport,caloriesConsumed,caloriesRest,caloriesBurned,restSport}
    await diaryService.updateDiaryClient(_id,{...dataClientDiary})
    const updateUser = (await diaryService.currentClientDiary({
      clientId: _id,
    })).toObject();
    updateUser.consumedProduct  =
    updateUser.consumedProduct.filter(
      (elem) => elem.date == option.date
    );
    updateUser.exerciseDone =  updateUser.exerciseDone.filter(
    (elem) => elem.date == option.date
  );
    res.status(200).json({
      diary: updateUser,
    });
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
