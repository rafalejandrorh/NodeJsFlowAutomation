const { telegram: { bot: { allowBots } } } = require('../../../config');

module.exports = (bot) => bot.use(async (context, next) => {

    isBot = context.from.is_bot;
    fullNameUser = context.from.first_name && context.from.last_name ? `${context.from.first_name} ${context.from.last_name}` : ``;

    if(isBot && !allowBots) {
        console.log('Bot NO permitido');
        context.reply(`Lo Sentimos! ${fullNameUser} Este Bot no está disponible para otros Bots`);
    }else{
        await next();
    }

});