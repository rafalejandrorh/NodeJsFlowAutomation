const UserService = require('../../API/services/user.service');

const service = new UserService();

module.exports = (bot) => bot.use(async (context, next) => {

    console.log(context);
    telegramId = context.from.id;
    username = context.from.username;

    const user = await service.findByTelegramIdAndUsername(username, telegramId);
    console.log(user);
    if(user.length === 0) {
        console.log('Usuario NO permitido');
        context.reply(`Lo Sentimos! No tienes acceso a este Bot`);
    }else{
        console.log('Usuario permitido');
        await next();
    }
});