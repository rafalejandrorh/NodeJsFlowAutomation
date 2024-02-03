const puppeteer = require('puppeteer');
const moment = require('moment');

const { 
    cambiosPay: { url, pathCalculator }, 
} = require('../../../config') 

const time = moment();

async function getDollarPrice() {
    try {
        const browser = await puppeteer.launch({
            headless: 'new', // 'new' : para que no se abra el navegador, false : para que se abra el navegador
            //slowMo: 200 // Tiempo de pausa 
        });

        const page = await browser.newPage();
        await page.goto(`${url}${pathCalculator}`);

        const getDollarPrice = await page.evaluate(() => {
            const elements = {};
    
            const dollarClass = document.querySelector('span.span.tasa_pp');
            console.log('dollarClass: ', dollarClass);
            elements.dolar = dollarClass.innerHTML;
    
            return elements;
        });
        getDollarPrice.fecha = time.format('YYYY-MM-DD HH:mm:ss');
        console.log('cambiosPayScraping.getDollarPrice: ', getDollarPrice);
    
        await browser.close();
        return getDollarPrice;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getDollarPrice
};