const { ctrlWrapper } = require("../utils");
const createError = require("../utils/createError");
const ERROR_TYPES = require("../constants/ERROR_CODES");

const { productsAll, productsAllCategories } = require("../models/mongoose/products");

const getAllProducts = async (req, res) => {
  const products = await productsAll.find();
  if (!products) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: "Not found",
    });
    throw error;
  }
  res.json(products);
};

const getAllCategories = async (req, res) => {
  const categories = await productsAllCategories.find();
  if (!categories) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: "Not found",
    });
    throw error;
  }
  res.json(categories);
};

module.exports = {
  getAllProducts: ctrlWrapper(getAllProducts),
  getAllCategories: ctrlWrapper(getAllCategories),
};
