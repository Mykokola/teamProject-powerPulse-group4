const authService = require("../services/identification");
const createError = require("../utils/createError");
const ERROR_TYPES = require("../constants/ERROR_CODES");
const { JWT_SECRET } = require("../constants/env");
const jwt = require("jsonwebtoken");
const validateSchems = require("../models/joi/identification");
const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const dubliceteClient = await authService.getClientByOptions({ email });
    if (validateSchems.registerSchema.validate(req.body).error) {
      const error = createError(ERROR_TYPES.BAD_REQUEST, {
        message: validateSchems.registerSchema.validate(req.body).error.details[0].message,
      });
      throw error;
    }
    if (dubliceteClient) {
      const error = createError(ERROR_TYPES.CONFLICT, {
        message: "user with this email registred",
      });
      throw error;
    }
    const registrationDate = new Date();
    const hashPassword = await bcrypt.hash(password, 11);
    const user = {
      ...req.body,
      password: hashPassword,
      registrationDate,
    };
    const currentUser = await authService.signup(user);
    const token = jwt.sign({ sub: currentUser._id }, JWT_SECRET, {
      expiresIn: 72000,
    });
    res.cookie("jwt", token, { secure: true });
    delete user.password;
    res.status(200).json({
      client: user,
      token,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (validateSchems.loginSchema.validate(req.body).error) {
      const error = createError(ERROR_TYPES.BAD_REQUEST, {
        message: validateSchems.loginSchema.validate(req.body).error.details[0].message,
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
    const currentUser = user.toObject();
    delete currentUser.password;
    const token = jwt.sign({ sub: user._id }, JWT_SECRET, { expiresIn: 72000 });
    res.cookie("jwt", token, { secure: true });
    res.status(200).json({
      client: currentUser,
      token,
    });
  } catch (e) {
    next(e);
  }
};

const calculateDailyMetrics = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const dailyMetricsData = req.body;
    if (validateSchems.dailyMetricsSchema.validate(dailyMetricsData).error) {
      const error = createError(ERROR_TYPES.UNAUTHORIZED, {
        message:
          validateSchems.dailyMetricsSchema.validate(dailyMetricsData).error.details[0].message,
      });
      throw error;
    }
    const lifestyleFactor = { 1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725, 5: 1.9 };
    const { height, birthday, levelActivity, sex, currentWeight } = dailyMetricsData;
    const lifestyleClientFactor = lifestyleFactor[levelActivity];
    const userAge = new Date(Date.now() - Date.parse(new Date(birthday))).getUTCFullYear() - 1970;
    const BMR = Math.round(
      (10 * currentWeight + 6.25 * height - 5 * userAge + (sex === "female" ? 5 : -161)) *
        lifestyleClientFactor
    );
    await authService.updateClientById(_id, { ...dailyMetricsData, BMR, timeForSport: 110 });
    const client = await authService.getClientByOptions({ _id });
    const currentUser = client.toObject();
    delete currentUser.password;
    res.status(200).json({
      client: {
        ...currentUser,
        BMR,
        timeForSport: 110,
      },
    });
  } catch (e) {
    next(e);
  }
};

const upload = async (req, res, next) => {
  try {
    const name = req.body;
    const file = req.file;
    const updateElem = {};
    const { _id } = req.user;
    let message;
    if (validateSchems.nameSchema.validate(name).error && !file) {
      const error = createError(ERROR_TYPES.BAD_REQUEST, {
        message: "name or avatar is incorrect ",
      });
      throw error;
    }
    if (req.body.name) {
      await authService.updateClientById(_id, name);
      const currentClient = await authService.getClientByOptions({ _id: req.user._id });
      updateElem.name = currentClient.name;
      message = "name was update";
    } else {
      const { path } = file;
      await authService.updateClientById(_id, { avatar: path });
      const currentClient = await authService.getClientByOptions({ _id: req.user._id });
      updateElem.avatar = currentClient.avatar;

      message = "avatar was update";
    }
    res.status(200).json({ ...updateElem });
  } catch (e) {
    next(e);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      client: user,
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      message: "Success logout",
    });
  } catch (e) {
    next(e);
  }
};
module.exports = {
  signup,
  login,
  currentUser,
  calculateDailyMetrics,
  upload,
  logout,
};
