const Joi = require('joi');

const id = Joi.number().integer();
const username = Joi.string().min(8);
const password = Joi.string().min(8);
const email = Joi.string().email();
const phone = Joi.string().min(13);
const telegramId = Joi.number().integer();
const role = Joi.string().min(5);

const createUserSchema = Joi.object({
  username: username.required(),
  password: password.required(),
  email: email,
  phone: phone,
  telegramId: telegramId,
  role: role.required()
});

const updateUserSchema = Joi.object({
  email: email,
  phone: phone,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const loginUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

module.exports = { 
  createUserSchema, 
  updateUserSchema, 
  getUserSchema,
  loginUserSchema 
}
