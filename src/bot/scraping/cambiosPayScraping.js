const puppeteer = require('puppeteer');
const moment = require('moment');

const time = moment();

async function getDollarPrice() {
    try {
        const browser = await puppeteer.launch({
            headless: 'new', // 'new' : para que no se abra el navegador, false : para que se abra el navegador
            //slowMo: 200 // Tiempo de pausa 
        });

        const page = await browser.newPage();
        await page.goto('https://cambiospay.com/calculadora-paypal-de-comisiones/');

        const getDollarPrice = await page.evaluate(() => {
            const elements = {};
    

            const dollarClass = document.querySelector('span.span.tasa_pp');
            console.log('dollarClass: ', dollarClass);
            elements.dolar = dollarClass.innerHTML;
    
            //return {dolar:'40,48540000',euro:'42,71173256',rublo:'1,40015471'}
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