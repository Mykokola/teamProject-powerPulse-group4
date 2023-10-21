const ERROR_CODES = require("../constants/ERROR_CODES");
const createError = require("../untils/createError");
const passport = require("../untils/authChecker");
const auth = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      const error = createError(ERROR_CODES.UNAUTHORIZED, {
        message: "Not authorized",
      });
      return next(error);
    }
    user = user.toObject();
    delete user.password;
    req.user = user;
    next();
  })(req, res, next);
};
module.exports = auth;
