const { telegram: { bot: { replySettingsDefault } } } = require('../../../config');

const { logErrors } = require('../middlewares/error.handler');

const TimeService = require('../services/time.service');

const service = new TimeService();

const regexTimezone = /^[A-Za-z]+\/[A-Za-z]+$/;

module.exports = (bot) => bot.command(['getTime', 'gettime'], async (context) => {

    try {
        timezones = [];
        payload = context.payload;
        if(payload) {
            console.log(payload);
            payloadSplit = payload.split(' ');
            payloadSplit.forEach(value => {
                if(regexTimezone.test(value)) {
                    timezones.push(value);
                }
            });
            console.log('timezones: ', timezones);

            if(timezones === '') {
                throw new Error('Missing Parameters');
            }
            
            reply = await service.getTime(timezones);
            console.log('response getTime: ', reply);
            context.reply(reply, replySettingsDefault);
        }else{
            throw new Error('Missing Parameters');
        }
    } catch (error) {
        logErrors(context, error);
    }
});