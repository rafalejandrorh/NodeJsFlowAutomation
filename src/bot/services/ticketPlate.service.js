const Moment = require('moment');

const ticketPlateScraping = require('../scraping/ticketPlateScraping');

class TicketPlaceService {

    constructor() {
        Moment.locale('es');
    }

    async validatePreOlympicTicketAvailability() {
        let result = '';
        let updatedAtFormat, updatedAt = '';
    
        const preOlympicTickets = await ticketPlateScraping.validatePreOlympicTicketAvailability();

        result = `Boletos Preolímpico: \n\n`;
        if(preOlympicTickets.length) {
            for (let index = 0; index < preOlympicTickets.length; index++) {
                const element = preOlympicTickets[index];
                result = `${result}${element}\n`;
            }
        }else{
            result = `${result} Lo sentimos, no pudimos obtener información de TicketPlate\n`;
        }

        updatedAtFormat = Moment().utcOffset('-04:00').format('dddd, MMMM Do YYYY, h:mm:ss a');
        updatedAt = `\nÚltima Actualización: ${updatedAtFormat}`;
        result = `${result}${updatedAt}`;

        return result;
    }

}

module.exports = TicketPlaceService;