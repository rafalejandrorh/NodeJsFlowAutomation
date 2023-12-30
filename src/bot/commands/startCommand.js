const { telegram: { bot: { replySettingsDefault } } } = require('../../../config');

module.exports = (bot) => bot.start(async (context) => {
    try {
        fullNameUser = context.from.first_name && context.from.last_name ? `${context.from.first_name} ${context.from.last_name}` : ``;
        await context.reply(`Bienvenido! ${fullNameUser}`, replySettingsDefault);

        await context.reply(`Este bot te ayudará a automatizar tus búsquedas del día a día.
        \nA continuación te mostraremos una lista de los comandos disponibles para que puedas ver de lo que este bot es capaz:`, replySettingsDefault);

        await context.reply(`Si estás interesado en alguna de las acciones de este bot, ejecuta el siguiente comando /register
        \nEl Administrador del Bot evaluará tu solicitud y te dará acceso en un plazo menor a 24 horas.`, replySettingsDefault);

    } catch (error) {
        console.log(error);
        context.reply('Lo sentimos! Ha ocurrido un error');
    }
});