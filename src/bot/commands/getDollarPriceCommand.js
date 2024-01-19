const { telegram: { bot: { replySettingsDefault } } } = require('../../../config');

const { logErrors } = require('../middlewares/error.handler');

const DollarService = require('../services/dollar.service');

const service = new DollarService();

module.exports = (bot) => bot.command(['getDollarPrice', 'getdollarprice'], async (context) => {

    try {
        reply = await service.getDollarPrice();
        context.reply(reply, replySettingsDefault);
        //context.replyWithMarkdownV2(reply);
    } catch (error) {
        logErrors(context, error);
    }
});