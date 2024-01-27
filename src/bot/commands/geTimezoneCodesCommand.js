const { telegram: { bot: { replySettingsDefault } } } = require('../../../config');

const { logErrors } = require('../middlewares/error.handler');

const TimeService = require('../services/time.service');

const service = new TimeService();

const regexCountryCode = /^[A-Z]{2}$/;

module.exports = (bot) => bot.command(['getTimezoneCodes', 'gettimezonecodes'], async (context) => {

    try {
        countryCode = '';
        payload = context.payload;
        if(payload) {
            console.log(payload);
            payloadSplit = payload.split(' ');
            payloadSplit.forEach(value => {
                if(regexCountryCode.test(value)) {
                    countryCode = value;
                }
            });
            console.log('countryCode: ', countryCode);

            if(countryCode === '') {
                throw new Error('Missing Parameters');
            }
            
            reply = await service.getTimezoneCodes(countryCode);
            console.log('response getTimezoneCodes: ', reply);
            context.reply(reply, replySettingsDefault);
        }else{
            throw new Error('Missing Parameters');
        }
    } catch (error) {
        logErrors(context, error);
    }
});