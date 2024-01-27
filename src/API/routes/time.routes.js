const express = require('express');
const passport = require('passport');

const TimeService = require('../services/time.service');
const validatorHandler = require('../middlewares/validator.handler');
const { countrySchema, timezoneSchema } = require('../schemas/time.schema');

const router = express.Router();
const service = new TimeService();

router.post('/', 
    //passport.authenticate('jwt', {session:false}),
    validatorHandler(timezoneSchema, 'body'),
    async (req, res, next) => {
        try {
            const { timezone } = req.body;
            const time = await service.getTime(timezone);
            res.json(time);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/codes/countries', 
    //passport.authenticate('jwt', {session:false}),
    async (req, res, next) => {
        try {
            const countriesCodes = await service.getCountriesCodes();
            res.json(countriesCodes);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/codes/timezones/', 
    //passport.authenticate('jwt', {session:false}),
    validatorHandler(countrySchema, 'body'),
    async (req, res, next) => {
        try {
            const { country } = req.body;
            const timezoneCodes = await service.getTimezoneCodes(country);
            res.json(timezoneCodes);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;

