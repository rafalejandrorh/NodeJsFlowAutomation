const Joi = require('joi');

const text = Joi.string().min(3).max(300);
const prompt = Joi.string().min(3).max(5).valid('text', 'texts');

const geminiSchema = Joi.object({
  prompt: {
    text: text.required()
  }
})

const promptGeminiSchema = Joi.object({
  prompt: prompt.required()
})

module.exports = { 
  geminiSchema, 
  promptGeminiSchema
}
