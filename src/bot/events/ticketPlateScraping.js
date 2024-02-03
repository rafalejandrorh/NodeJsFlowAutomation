const { telegram: { bot: { replySettingsDefault } } } = require('../../../config');

const EventEmitter = require('events');
const webScrapingEvents = new EventEmitter();

const ticketPlateScraping = require('../scraping/ticketPlateScraping');

const TicketPlateService = require('../services/ticketPlate.service');
const ticketPlateService = new TicketPlateService();

const MailService = require('../services/mail.service');
const mailService = new MailService();

webScrapingEvents.on('validatePreOlympicTicketAvailability', async (bot) => {
    const reply = await ticketPlateService.validatePreOlympicTicketAvailability();
    
    // Enviar mensaje a usuarios específicos de Telegram (Utilizar para enviar precio del dólar)
    bot.telegram.sendMessage(1026291175, reply, replySettingsDefault);
});

module.exports = webScrapingEvents;