const express = require('express');

const DollarService = require('../services/dollar.service');
const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');

const router = express.Router();
const service = new DollarService();

router.get('/price/', 
    //passport.authenticate('jwt', {session:false}),
    async (req, res, next) => {
        try {
            const dollarPrice = await service.getDollarPrice();
            res.json(dollarPrice);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    //passport.authenticate('jwt', {session:false}),
    //validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await service.findOne(id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;

