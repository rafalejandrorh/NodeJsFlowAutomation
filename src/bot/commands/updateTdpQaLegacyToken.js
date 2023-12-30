const { telegram: { bot: { replySettingsDefault } } } = require('../../../config');

const SdcService = require('../services/sdc.service');

const service = new SdcService();

module.exports = (bot) => bot.command(['updateTdpQaLegacyToken', 'updateTdpQaLegacyToken'], async (context) => {

    try {
        reply = await service.updateTdpQaLegacyToken();
        context.reply(reply);
        //context.replyWithMarkdownV2(reply);
    } catch (error) {
        console.log(error);
        context.reply(`Lo sentimos! Ha ocurrido un error`);
    }
});