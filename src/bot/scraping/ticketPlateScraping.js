const puppeteer = require('puppeteer');

const { 
    ticketPlate: { url }, 
    regExp: { conmebolPreOlympicTicket: regExpConmebolPreOlympicTicket } 
} = require('../../../config') 

async function validatePreOlympicTicketAvailability() {
    try {
        let preOlympicTickets = [];
        const browser = await puppeteer.launch({
            headless: 'new', // 'new' : para que no se abra el navegador, false : para que se abra el navegador
            //slowMo: 200 // Tiempo de pausa 
        });

        const page = await browser.newPage();
        await page.goto(url);

        const h5Elements = await page.$$('h5');

        for (let h5 of h5Elements) {

            const elements = await page.evaluate(element => {
                return {
                    text: element.innerText,
                    attributes: element.getAttributeNames(),
                };
            }, h5);

            if (regExpConmebolPreOlympicTicket.test(elements.text)) {
                console.log(elements.text);
                preOlympicTickets.push(elements.text);
            }
        }
        await browser.close();
        
        return preOlympicTickets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    validatePreOlympicTicketAvailability
};