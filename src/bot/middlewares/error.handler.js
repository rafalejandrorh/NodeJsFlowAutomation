function logErrors (context, error) {
    console.error(error);
    context.reply(`Lo sentimos! Ha ocurrido un error. Revisa que hayas enviado el comando y los parámetros correctos`);
}

module.exports = {
    logErrors
}

// module.exports = (bot) => bot.use(async (context, next) => {

//     console.log(context);
//     telegramId = context.from.id;
//     username = context.from.username;

//     const user = await service.findByTelegramIdAndUsername(username, telegramId);
//     console.log(user);
//     if(user.length === 0) {
//         console.log('Usuario NO permitido');
//         context.reply(`Lo Sentimos! No tienes acceso a este Bot`);
//     }else{
//         console.log('Usuario permitido');
//         await next();
//     }
// });