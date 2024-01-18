const Joi = require('joi');

const source = Joi.string().min(3).max(6);

const findOneDollarSchema = Joi.object({
  source: source.required()
})

module.exports = { 
  findOneDollarSchema, 
}
