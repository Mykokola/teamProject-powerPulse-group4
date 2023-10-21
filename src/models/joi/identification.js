const Joi = require("joi");
const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const emailJoi = Joi.string().min(3).max(30).regex(emailPattern).required();
const passwordJoi = Joi.string().min(6).max(30).required();
const registerSchema = Joi.object().keys({
  email: emailJoi,
  name: Joi.string().required(),
  password: passwordJoi,
});
const loginSchema = Joi.object().keys({
  email: emailJoi,
  password: passwordJoi,
});
const dailyMetricsSchema = Joi.object().keys({
  height: Joi.number().min(150).required(),
  currentWeight: Joi.number().min(35).required(),
  desiredWeight: Joi.number().min(35).required(),
  birthday: Joi.date().max('now').iso().required().raw()
    .custom((value, helpers) => {
      const diff = Date.now() - value.getTime();
      if (diff < 18 * 365.25 * 24 * 60 * 60 * 1000) {
        return helpers.error('date.max');
      }
      return value;
    }),
  blood: Joi.number().valid(1, 2, 3, 4).required(),
  sex: Joi.string().valid("male", "female").required(),
  levelActivity: Joi.number().valid(1, 2, 3, 4, 5).required(),
});
module.exports = {
  registerSchema,
  loginSchema,
  dailyMetricsSchema,
};
