const ticketPlateScrapingEvents = require('../events/ticketPlateScraping');

module.exports = (cron, bot) => {
    // Se ejecutará al segundo 0 de cada minuto, de cada hora, de cada día
    cron.schedule('0 */5 * * * *', async () => {
        // Executing Cron at 0 seconds, of each minutos, each hour, each day 
        ticketPlateScrapingEvents.emit('validatePreOlympicTicketAvailability', bot);
    });
};