const express = require('express');
const passport = require('passport');

const MailService = require('../services/mail.service');
const validatorHandler = require('../middlewares/validator.handler');
const { emailSchema, sendMailSchema } = require('../schemas/mail.schema');

const router = express.Router();
const service = new MailService();

router.post('/:email/send', 
    //passport.authenticate('jwt', {session:false}),
    validatorHandler(emailSchema, 'params'),
    validatorHandler(sendMailSchema, 'body'),
    async (req, res, next) => {
        try {
            const { email } = req.params;
            const data = req.body;
            const dollarPrice = await service.sendMail(email, data);
            res.json(dollarPrice);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;

