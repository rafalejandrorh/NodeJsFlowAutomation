const Joi = require('joi');

const source = Joi.string().min(3).max(6);

const sourceDollarSchema = Joi.object({
  source: source.required()
})

module.exports = { 
  sourceDollarSchema, 
}
