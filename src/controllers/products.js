const { ctrlWrapper } = require("../utils");
const createError = require("../utils/createError");
const ERROR_TYPES = require("../constants/ERROR_CODES");
const productService = require("../services/products");


const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.allProducts();
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
    const categories = await productService.allCategories();

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

    if (restrictedValue === "" || (restrictedValue !== "true" && restrictedValue !== "false")) {
      const error = createError(ERROR_TYPES.NOT_FOUND, {
        message: "Incorrect path value",
      });
      throw error;
    }

    const user = req.user;
    const bloodCategory = user.blood;
    let products;
    if (restrictedValue === "true") {
      products = await productService.allProductsBloodSearch({
        [`groupBloodNotAllowed.${bloodCategory}`]: true,
      });
    } else if (restrictedValue === "false") {
      products = await productService.allProductsBloodSearch({
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
