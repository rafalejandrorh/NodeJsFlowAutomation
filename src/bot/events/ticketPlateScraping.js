const { telegram: { bot: { replySettingsDefault } } } = require('../../../config');

const EventEmitter = require('events');
const ticketPlateEvents = new EventEmitter();

const TicketPlateService = require('../services/ticketPlate.service');
const ticketPlateService = new TicketPlateService();

ticketPlateEvents.on('validatePreOlympicTicketAvailability', async (bot) => {
    const reply = await ticketPlateService.validatePreOlympicTicketAvailability();
    
    // Enviar mensaje a usuarios específicos de Telegram (Utilizar para enviar precio del dólar)
    bot.telegram.sendMessage(1026291175, reply, replySettingsDefault);
});

module.exports = ticketPlateEvents;