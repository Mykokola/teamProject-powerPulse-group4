const authService = require("../services/identification");
const createError = require("../untils/createError");
const ERROR_TYPES = require("../constants/ERROR_CODES");
const { JWT_SECRET } = require("../constants/env");
const jwt = require("jsonwebtoken");
const validateSchems = require("../models/joi/identification");
const bcrypt = require("bcrypt");
const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const dubliceteClient = await authService.getClientByOptions({ email });
    if (!validateSchems.registerSchema.validate(req.body)) {
      const error = createError(ERROR_TYPES.BAD_REQUEST, {
        message: "validate error",
      });
      throw error;
    }
    if (dubliceteClient) {
      const error = createError(ERROR_TYPES.CONFLICT, {
        message: "user with this email registred",
      });
      throw error;
    }
    const hashPassword = await bcrypt.hash(password, 11);
    const user = {
      ...req.body,
      password: hashPassword,
    };
    await authService.signup(user);
    const token = jwt.sign({ sub: user._id }, JWT_SECRET, { expiresIn: 3600 });
    res.cookie("jwt", token, { secure: true });
    delete user.password;
    res.status(200).json({
      user,
      token,
    });
  } catch (e) {
    next(e);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!validateSchems.loginSchema.validate(req.body)) {
      const error = createError(ERROR_TYPES.BAD_REQUEST, {
        message: "validate error",
      });
      throw error;
    }
    const user = await authService.getClientByOptions({ email });
    if (!user) {
      const error = createError(ERROR_TYPES.CONFLICT, {
        message: "user with this email was not registered",
      });
      throw error;
    }
    const hashPassword = user.password;
    const validPassword = await bcrypt.compare(hashPassword, password);
    if (validPassword) {
      const error = createError(ERROR_TYPES.UNAUTHORIZED, {
        message: "email or password is incorrect",
      });
      throw error;
    }
    delete user.password;
    const token = jwt.sign({ sub: user._id }, JWT_SECRET, { expiresIn: 3600 });
    res.cookie("jwt", token, { secure: true });
    res.status(200).json({
      user,
      token,
    });
  } catch (e) {
    next(e);
  }
};
const calculateDailyMetrics = async (req,res,next) => {
    try{

    }catch(e){
        next(e)
    }
}
const currentUser = async (req, res, next) => {
  try {
    const user = req.user.toObject()
    delete user.password
    res.status(200).json({
        user
    });
  } catch (e) {
    next(e);
  }
};
module.exports = {
  signup,
  login,
  currentUser,
  calculateDailyMetrics
};
