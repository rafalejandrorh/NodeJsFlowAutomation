const { telegram: { bot: { replySettingsDefault } } } = require('../../../config');

const EventEmitter = require('events');
const dollarPriceEvents = new EventEmitter();

const DollarPriceService = require('../services/dollar.service');
const dollarPriceService = new DollarPriceService();

const MailService = require('../services/mail.service');
const mailService = new MailService();

dollarPriceEvents.on('sendUpdate', async (bot) => {
    let emailData = {};

    console.log(`sending update of Dollar price to All Users`);
    reply = await dollarPriceService.getDollarPrice();
    
    // Enviar mensaje a usuarios específicos de Telegram (Utilizar para enviar precio del dólar)
    // Hacer un for para enviar mensaje con el precio del dolar actualizado
    // A todos los usuarios activos y registrados en el bot 
    bot.telegram.sendMessage(1026291175, reply, replySettingsDefault);
    // bot.context.reply(reply, {
    //     chat_id: 1026291175,
    //     ...replySettingsDefault,
    // })

    // Enviar Actualización del Precio del Dólar por correo
    emailData.mailTo = 'rafalejandrorivero@gmail.com';
    emailData.subject = 'Actualización del Precio del Dólar';
    emailData.html = reply;
    mailService.sendMail(emailData);
});

module.exports = dollarPriceEvents;