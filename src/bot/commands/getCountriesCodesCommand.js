const { telegram: { bot: { replySettingsDefault } } } = require('../../../config');

const { logErrors } = require('../middlewares/error.handler');

const TimeService = require('../services/time.service');

const service = new TimeService();

module.exports = (bot) => bot.command(['getCountriesCodes', 'getcountriescodes'], async (context) => {

    try {
        reply = await service.getCountriesCodes();
        console.log('response getCountriesCodes: ', reply);
        context.reply(reply, replySettingsDefault);
    } catch (error) {
        logErrors(context, error);
    }
});