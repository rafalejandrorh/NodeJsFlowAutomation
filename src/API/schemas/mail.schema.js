const Joi = require('joi');

const email = Joi.string().email();
const subject = Joi.string().max(50);
const html = Joi.string().max(300);

const emailSchema = Joi.object({
  email: email.required()
})

const sendMailSchema = Joi.object({
  subject: subject.required(),
  html: html.required()
})

module.exports = { 
  emailSchema,
  sendMailSchema 
}
