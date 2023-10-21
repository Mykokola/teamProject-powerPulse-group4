const { ctrlWrapper, HttpError } = require("../utils");
const { productsAll, productsAllCategories } = require("../models/mongoose/products");

const getAllProducts = async (req, res) => {
  const products = await productsAll.find();
  if (!products) {
    throw HttpError(404, "Not found");
  }
  res.json(products);
};

const getAllCategories = async (req, res) => {
  const categories = await productsAllCategories.find();
  if (!categories) {
    throw HttpError(404, "Not found");
  }
  res.json(categories);
};

module.exports = {
  getAllProducts: ctrlWrapper(getAllProducts),
  getAllCategories: ctrlWrapper(getAllCategories),
};
