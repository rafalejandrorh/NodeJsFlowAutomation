const express = require('express');
const passport = require('passport');

const CommandsService = require('../services/commands.service');
const validatorHandler = require('../middlewares/validator.handler');
const { findOneDollarSchema } = require('../schemas/dollar.schema');

const router = express.Router();
const service = new CommandsService();

router.get('/', 
    //passport.authenticate('jwt', {session:false}),
    async (req, res, next) => {
        try {
            const commands = await service.getCommands();
            res.json(commands);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;

