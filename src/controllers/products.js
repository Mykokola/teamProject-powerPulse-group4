const { ctrlWrapper } = require("../utils");
const createError = require("../utils/createError");
const ERROR_TYPES = require("../constants/ERROR_CODES");
const productService = require("../services/products");
const validateSchema = require("../models/joi/products");

const getAllProducts = async (req, res, next) => {
  const { page, limit } = req.query;
  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);
  const filterOptions = req.body;
  const { blood } = req.user;

  if (validateSchema.productsFilter.validate(filterOptions).error) {
    const error = createError(ERROR_TYPES.BAD_REQUEST, {
      message: "body is incorrect",
    });
    throw error;
  }

  if (validateSchema.productsPaginationFilter.validate(req.query).error) {
    const error = createError(ERROR_TYPES.BAD_REQUEST, {
      message: "query params is incorrect",
    });
    throw error;
  }

  try {
    let productsList = await productService.paginatedProducts(1, Infinity);

    if (filterOptions.category) {
      productsList = productsList.filter((e) => e.category === filterOptions.category);
    }
    if (filterOptions.recommendation && filterOptions.recommendation !== "all") {
      const recommendationOption = filterOptions.recommendation === "recommend";
      productsList = productsList.filter(
        (e) => e.groupBloodNotAllowed[blood] === recommendationOption
      );
    }
    if (filterOptions.search) {
      productsList = productsList.filter((e) => e.title === filterOptions.search);
    }

    const startIndex = (parsedPage - 1) * parsedLimit;
    const endIndex = parsedPage * parsedLimit;
    const paginatedProducts = productsList.slice(startIndex, endIndex);

    if (paginatedProducts.length === 0) {
      const error = createError(ERROR_TYPES.NOT_FOUND, {
        message: "product is not found",
      });
      throw error;
    }

    res.status(200).json(paginatedProducts);
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
