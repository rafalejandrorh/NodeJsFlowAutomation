const { telegram: { bot: { replySettingsDefault } } } = require('../../../config');

const DollarService = require('../services/dollar.service');

const service = new DollarService();

module.exports = (bot) => bot.command(['updateDollarPrice', 'updatedollarprice'], async (context) => {

    try {
        reply = await service.getDollarPrice();
        context.reply(reply, replySettingsDefault);
        //context.replyWithMarkdownV2(reply);
    } catch (error) {
        console.log(error);
        context.reply(`Lo sentimos! Ha ocurrido un error`);
    }
});