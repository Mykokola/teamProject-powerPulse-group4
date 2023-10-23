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
    const { _id } = req.user;
    if (validateSchema.productPattern.validate(product).error) {
      const error = createError(ERROR_TYPES.BAD_REQUEST, {
        message: "body is incorrect",
      });
      throw error;
    }
    if (!product.date) {
      let date = new Date().toISOString().split("T")[0];
      product.date = date;
    }
    const productFromBd = await productService.getProductById({_id:product.product})
    if(!productFromBd){
      const error = createError(ERROR_TYPES.NOT_FOUND,{
        message:"product is not a found"
      })
      throw error
    }
    await diaryService.addInDiaryProduct(_id, { ...product, id: nanoid() });

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
        message: "body is incorrect",
      });
      throw error;
    }
    if (!exercise.date) {
      let date = new Date().toISOString().split("T")[0];
      exercise.date = date;
    }
    const exerciseFromBd = await exerciseService.getExerciseById({_id:exercise.exercise})
    if(!exerciseFromBd){
      const error = createError(ERROR_TYPES.NOT_FOUND,{
        message:"exercise is not a found"
      })
      throw error
    }
    await diaryService.addInDiaryExercise(_id, { ...exercise, id: nanoid() });
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
        message: "path is incorrect",
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
        message: "path is incorrect",
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
    const optional = req.params;
    const { _id } = req.user;
    if (validateSchema.datePattern.validate(optional).error) {
      const error = createError(ERROR_TYPES.BAD_REQUEST, {
        message: "body is incorrect",
      });
      throw error;
    }
    const currentClientDiary = await diaryService.currentClientDiary({
      clientId: _id,
    });
    currentClientDiary.consumedProduct =
      currentClientDiary.consumedProduct.filter(
        (elem) => elem.date == optional.date
      );
    currentClientDiary.exerciseDone = currentClientDiary.exerciseDone.filter(
      (elem) => elem.date == optional.date
    );
    res.status(200).json({
      dairy: currentClientDiary,
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
