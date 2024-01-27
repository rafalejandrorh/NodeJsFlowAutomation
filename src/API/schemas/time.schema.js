const Joi = require('joi');

const country = Joi.string().min(1).max(3);
const timezone = Joi.string().min(5).max(15);

const countrySchema = Joi.object({
  country: country
})

const timezoneSchema = Joi.object({
  timezone: timezone.required()
})

module.exports = { 
  countrySchema,
  timezoneSchema
}
