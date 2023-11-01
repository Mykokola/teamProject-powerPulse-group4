const Joi = require("joi");
const productsFilter = Joi.object().keys({
  category: Joi.string().optional(),
  recommendation: Joi.string().valid("all", "recommend", "notRecommend").optional(),
});


const productsPaginationFilter = Joi.object()
  .keys({
    page: Joi.string().required(),
    limit: Joi.string().required(),
  })
  .options({ allowUnknown: true });

module.exports = { productsFilter, productsPaginationFilter };
