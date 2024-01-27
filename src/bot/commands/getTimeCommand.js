const { 
    telegram: { bot: { replySettingsDefault } }, 
    regExp: { timezone: regExpTimezone } 
} = require('../../../config');

const { logErrors } = require('../middlewares/error.handler');

const TimeService = require('../services/time.service');

const service = new TimeService();

module.exports = (bot) => bot.command(['getTime', 'gettime'], async (context) => {

    try {
        timezones = [];
        payload = context.payload;
        if(payload) {
            console.log(payload);
            payloadSplit = payload.split(' ');
            payloadSplit.forEach(value => {
                if(regExpTimezone.test(value)) {
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