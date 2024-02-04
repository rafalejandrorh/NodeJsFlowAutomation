const { 
    telegram: { bot: { replySettingsDefault } },
    regExp: { email: regExpEmail, phone: regExpPhone }
} = require('../../../config');

const { logErrors } = require('../middlewares/error.handler');

const UserService = require('../services/users.service');

const { generatePassword } = require('../utils/tools/');

const service = new UserService();

module.exports = (bot) => bot.command(['register'], async (context) => {

    try {
        let dataUser = {};

        userTelegram = context.from;
        payload = context.payload;

        dataUser.telegramId = userTelegram.id;
        dataUser.username = userTelegram.username;
        dataUser.role = 'client';
        //dataUser.isActive = false;
        dataUser.password = generatePassword;

        if(payload) {
            console.log(payload);
            payloadSplit = payload.split(' ');
            payloadSplit.forEach(value => {

                if(regExpEmail.test(value)) {
                    dataUser.email = value;
                }
                
                if(regExpPhone.test(value)) {
                    dataUser.phone = value;
                }
            });
            console.log('dataUser: ', dataUser);

            reply = await service.register(dataUser);
            console.log('response register: ', reply);
            context.reply('Usuario registrado exitosamente. Ahora puedes acceder a las herramientas que te brinda nuestro bot.', replySettingsDefault);
        }
    } catch (error) {
        logErrors(context, error);
    }
});