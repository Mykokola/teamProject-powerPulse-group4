const ERROR_CODE = require("../constants/ERROR_CODES");

const HttpError = (status, message = ERROR_CODE[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
