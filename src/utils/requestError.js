const createError = require("../utils/createError");
const ERROR_TYPES = require("../constants/ERROR_CODES");

const requestError = (message) => {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: message || "Not found",
    });
    throw error;
  };
  module.exports = requestError