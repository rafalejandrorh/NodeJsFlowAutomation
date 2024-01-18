const { telegram: { bot: { replySettingsDefault } } } = require('../../../config');

const { logErrors } = require('../middlewares/error.handler');

const SdcService = require('../services/sdc.service');

const service = new SdcService();

module.exports = (bot) => bot.command(['updateTdpQaLegacyToken', 'updateTdpQaLegacyToken'], async (context) => {

    try {
        reply = await service.updateTdpQaLegacyToken();
        context.reply(reply);
        //context.replyWithMarkdownV2(reply);
    } catch (error) {
        logErrors(context, error);
    }
});