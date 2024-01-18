const { telegram: { bot: { replySettingsDefault } } } = require('../../../config');

const { logErrors } = require('../middlewares/error.handler');

const UserService = require('../services/users.service');

const generatePassword = require('../utils/tools/generatePassword');

const service = new UserService();

const regexEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
const regexPhone = /^\+\d{1,3}\d{3,14}$/;

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

                if(regexEmail.test(value)) {
                    dataUser.email = value;
                }
                
                if(regexPhone.test(value)) {
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