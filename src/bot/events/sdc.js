const EventEmitter = require('events');
const dollarPriceEvents = new EventEmitter();

const SdcService = require('../services/sdc.service');
const sdcService = new SdcService();

// dollarPriceEvents.on('updateTokenLegacyTdpQa', async (bot) => {
//     console.log(`updating token Legacy TDP QA`);
//     reply = await sdcService.updateTokenLegacyTdpQa();
    
//     // Enviar mensaje a usuarios específicos de Telegram (Utilizar para enviar precio del dólar)
//     // Hacer un for para enviar mensaje con el precio del dolar actualizado
//     // A todos los usuarios activos y registrados en el bot 
//     bot.telegram.sendMessage(1026291175, reply);
// });

module.exports = dollarPriceEvents;