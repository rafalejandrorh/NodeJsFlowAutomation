const express = require('express');
const passport = require('passport');

const DollarService = require('../services/dollar.service');
const validatorHandler = require('../middlewares/validator.handler');
const { findOneDollarSchema } = require('../schemas/dollar.schema');

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

router.post('/price/:source',
    //passport.authenticate('jwt', {session:false}),
    validatorHandler(findOneDollarSchema, 'params'),
    async (req, res, next) => {
        try {
            const { source } = req.params;
            const dollarPrice = await service.findOneDollarPrice(source);
            res.json(dollarPrice);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/price/sources',
    async (req, res, next) => {
        try {
            const dollarPrice = await service.getDollarPriceAllowed();
            res.json(dollarPrice);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;

