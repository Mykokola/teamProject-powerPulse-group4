const { ctrlWrapper } = require("../utils");
const createError = require("../utils/createError");
const ERROR_TYPES = require("../constants/ERROR_CODES");
const productService = require("../services/products");
const validateSchema = require("../models/joi/products");

// const getAllProducts = async (req, res, next) => {
//   const { page = 1, limit = 20 } = req.query;
//   const parsedPage = parseInt(page);
//   const parsedLimit = parseInt(limit);

//   try {
//     const products = await productService.paginatedProducts(
//       parsedPage,
//       parsedLimit
//     );

//     if (products.length === 0) {
//       return res.status(404).json({
//         error: "Not found",
//       });
//     }

//     res.json(products);
//   } catch (e) {
//     next(e);
//   }
// };

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
    let products = await productService.paginatedProducts(parsedPage, parsedLimit);

    if (filterOptions.category) {
      products = products.filter((e) => e.category === filterOptions.category);
    }

    if (filterOptions.recommendation && filterOptions.recommendation !== "all") {
      const recommendOption = filterOptions.recommendation === "recommend";
      products = products.filter((e) => e.groupBloodNotAllowed[blood] === recommendOption);
    }

    if (filterOptions.search) {
      products = products.filter((e) => e.title === filterOptions.search);
    }

    if (products.length === 0) {
      const error = createError(ERROR_TYPES.NOT_FOUND, {
        message: "Product is not found",
      });
      throw error;
    }

    res.status(200).json(products);
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
const filterProduct = async (req, res, next) => {
  try {
    const filterOptions = req.body;
    const { blood } = req.user;
    if (validateSchema.productsFilter.validate(filterOptions).error) {
      const error = createError(ERROR_TYPES.BAD_REQUEST, {
        message: "body is incorrect",
      });
      throw error;
    }
    let productsList = await productService.allProducts();
    if (filterOptions.category) {
      productsList = productsList.filter((e) => e.category === filterOptions.category);
    }
    if (filterOptions.recommendation && filterOptions.recommendation !== "all") {
      let recomendOption = filterOptions.recommendation === "recommend";
      productsList = productsList.filter((e) => e.groupBloodNotAllowed[blood] === recomendOption);
    }
    if (filterOptions.search) {
      productsList = productsList.filter((e) => e.title == filterOptions.search);
    }
    if (productsList.length === 0) {
      const error = createError(ERROR_TYPES.NOT_FOUND, {
        message: "prodcut is not a found",
      });
      throw error;
    }
    res.status(200).json(productsList);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllProducts: ctrlWrapper(getAllProducts),
  getAllCategories: ctrlWrapper(getAllCategories),
  getAvailableProducts: ctrlWrapper(getAvailableProducts),
  filterProduct: ctrlWrapper(filterProduct),
};
