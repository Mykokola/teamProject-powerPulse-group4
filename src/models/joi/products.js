const Joi = require("joi");



const productsPaginationFilter = Joi.object()
  .keys({
    page: Joi.string().required(),
    limit: Joi.string().required(),
    category: Joi.string().optional(),
    recommendation: Joi.string().valid("all", "recommend", "notRecommend","").optional(),
  })
  .options({ allowUnknown: true });

module.exports = {  productsPaginationFilter };
