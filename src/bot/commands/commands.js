const { telegram: { bot: { replySettingsDefault } } } = require('../../../config');

const { logErrors } = require('../middlewares/error.handler');

const CommandsService = require('../services/commands.service');

const service = new CommandsService();

module.exports = (bot) => bot.command(['commands'], async (context) => {

    try {
        reply = await service.getListCommands();
        console.log('response getListCommands: ', reply);
        context.reply(reply, replySettingsDefault);
    } catch (error) {
        logErrors(context, error);
    }
});