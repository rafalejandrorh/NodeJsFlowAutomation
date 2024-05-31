const express = require('express');

const GeminiService = require('../services/gemini.service');
const validatorHandler = require('../middlewares/validator.handler');
const { geminiSchema, promptGeminiSchema } = require('../schemas/gemini.schema');
const passport = require('passport');

const router = express.Router();


router.post('/:prompt/prompt', 
    //passport.authenticate('jwt', {session:false}),
    validatorHandler(geminiSchema, 'body'),
    validatorHandler(promptGeminiSchema, 'params'),
    async (req, res, next) => {
        try {
            const { prompt: { text } } = req.body;
            const { prompt } = req.params;
            const service = new GeminiService();
            if(prompt === 'text') {
                const geminiService = await service.promptText(text);
                return res.json(geminiService);
            }
            throw new Error('Missing Prompt');
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;

