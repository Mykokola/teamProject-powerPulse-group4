const { ctrlWrapper } = require("../utils");
const createError = require("../utils/createError");
const ERROR_TYPES = require("../constants/ERROR_CODES");

const { productsAll, productsAllCategories } = require("../models/mongoose/products");

const getAllProducts = async (req, res, next) => {
  try {
    const products = undefined;
    if (!products) {
      const error = createError(ERROR_TYPES.NOT_FOUND, {
        message: "Not found",
      });
      throw error;
    }
    res.json(products);
  } catch (e) {
    next(e);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await productsAllCategories.find();
    if (!categories) {
      const error = createError(ERROR_TYPES.NOT_FOUND, {
        message: "Not found",
      });
      throw error;
    }
    res.json(categories);
  } catch (e) {
    next(e);
  }
};

const getAvailableProducts = async (req, res, next) => {
  try {
    const restrictedValue = req.params.type;

    if (restrictedValue === "" && restrictedValue !== "true" && restrictedValue !== "false") {
      const error = createError(ERROR_TYPES.NOT_FOUND, {
        message: "Not found",
      });
      throw error;
    }
    const user = req.user;
    const bloodCategory = user.blood;
    let products;
    if (restrictedValue === "true") {
      products = await productsAll.find({
        [`groupBloodNotAllowed.${bloodCategory}`]: true,
      });
    } else {
      products = await productsAll.find({
        [`groupBloodNotAllowed.${bloodCategory}`]: false,
      });
    }
    res.json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts: ctrlWrapper(getAllProducts),
  getAllCategories: ctrlWrapper(getAllCategories),
  getAvailableProducts: ctrlWrapper(getAvailableProducts),
};
