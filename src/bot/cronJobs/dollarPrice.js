const dollarPriceEvents = require('../events/dollarPrice');

module.exports = (cron, bot) => {
    // Se ejecutará al segundo y minuto de las horas y días indicados
    //cron.schedule('0 32 22 * * *', async () => {
    cron.schedule('0 31 9,13,18 * * 1,2,3,4,5,6', async () => {
        // Executing Cron at 0 seconds, 31 minutos of 9, 13 and 18 hours 
        // Each day except on Saturdays and Sundays 
        dollarPriceEvents.emit('sendUpdate', bot);
    });
};