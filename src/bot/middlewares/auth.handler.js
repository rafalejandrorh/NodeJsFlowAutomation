const UserService = require('../../API/services/user.service');

const service = new UserService();

module.exports = (bot) => bot.use(async (context, next) => {

    console.log(context);
    telegramId = context.from.id;
    username = context.from.username;

    const user = await service.findByTelegramIdAndUsername(username, telegramId);
    let isAuth = user.dataValues.is_auth;
    console.log('is_auth: ', isAuth);

    if(!isAuth) {
        console.log('Usuario NO permitido');
        context.reply(`Lo Sentimos! No tienes acceso a este Bot/Commando`);
    }else{
        console.log('Usuario permitido');
        await next();
    }
});