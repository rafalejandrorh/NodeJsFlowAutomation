const express = require('express');

const SdcService = require('../services/sdc.service');
const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');

const router = express.Router();


router.get('/:environment/TDP/Token/', 
    //passport.authenticate('jwt', {session:false}),
    async (req, res, next) => {
        try {
            const { environment } = req.params;
            const service = new SdcService(environment);
            const sdcService = await service.updateTokenTdp();
            res.json(sdcService);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;

