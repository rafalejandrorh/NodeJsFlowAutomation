const puppeteer = require('puppeteer');

const { regExp: { conmebolPreOlympicTicket: regExpConmebolPreOlympicTicket } } = require('../../../config') 

const regexNgContent = /_ngcontent-ng-/;
const regexAgotado = /AGOTADO/;
const regexOneNumber = /\d+/;

async function validatePreOlympicTicketAvailability() {
    try {
        let preOlympicTickets = [];
        const browser = await puppeteer.launch({
            headless: 'new', // 'new' : para que no se abra el navegador, false : para que se abra el navegador
            //slowMo: 200 // Tiempo de pausa 
        });

        const page = await browser.newPage();
        await page.goto('https://ticketplate.com/');

        // const PreOlympicTicket = await page.evaluate(() => {
        //     const elements = {};
    
        //     const eventsContainerDiv = document.querySelector('.events-container');
        //     console.log('eventsContainerDiv: ', eventsContainerDiv);

        //     elements.dolar = dollarClass.innerHTML;
    
        //     return elements;
        // });
        const h5Elements = await page.$$('h5');

        // Recorremos cada elemento h5
        for (let h5 of h5Elements) {
            // Obtenemos el texto y atributos del elemento
            const elements = await page.evaluate(element => {
                return {
                    text: element.innerText,
                    attributes: element.getAttributeNames(),
                };
            }, h5);

            // Comprobamos si el texto coincide con la expresión regular
            if (regExpConmebolPreOlympicTicket.test(elements.text)) {
                // Imprimimos el texto por la consola
                console.log(elements.text);
                preOlympicTickets.push(elements.text);
                // for (let attribute of elements.attributes) {
                //     if(regexNgContent.test(attribute)) {
                //         // Imprimimos el atributo por la consola
                //         console.log(attribute);

                //         const pElements = await page.$$(`p[${attribute}]`);
                //         for (let p of pElements) {
                //             const date = await page.evaluate(element => element.innerText, p);
                //             //if(regexOneNumber.test(date)) {
                //                 console.log(date);
                //             //}
                //         }

                //     }
                // }
    
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