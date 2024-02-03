const Moment = require('moment');
const axios = require('axios');

const { 
    API: { V1: { endpoint: endpointV1 } }, 
    paypal: { paypalFee, paypalFeeAdditional },
    dollar: { pricesAllowed: { codes: codesDollarPricesAllowed } } 
} = require('../../../config') 

const inArray = require('../utils/tools/inArray');

const cambiosPayScraping = require('../scraping/cambiosPayScraping');

class DollarService {

    constructor() {
        Moment.locale('es');
        this.paypalFee = paypalFee;
        this.paypalFeeAdditional = paypalFeeAdditional;
        this.codesDollarPricesAllowed = codesDollarPricesAllowed
    }

    async getDollarPrice() {
        let result = '';
        let name, price, updatedAtFormat, updatedAt = '';
    
        const { data } = await axios.get(`${endpointV1}/dollar/price/`);
        console.log('getDollarPrice: ', data);
    
        for (let index = 0; index < data.length; index++) {
            if(inArray(data[index].symbol, this.codesDollarPricesAllowed)) {
                name = `${data[index].name}`; //name.replace(/\./g, "\\\\.");
                price = `\nPrecio: ${data[index].price}`;

                updatedAtFormat = Moment(data[index].updatedAt).utcOffset('-04:00').format('dddd, MMMM Do YYYY, h:mm:ss a');
                updatedAt = `\nÚltima Actualización: ${updatedAtFormat}`;

                result = `${result}${name}${price}${updatedAt}\n\n`;
            }
        }

        return result;
    }

    async getDollarPriceCambiosPay() {
        let result = '';
        let name, price, updatedAtFormat, updatedAt = '';
    
        const cambiosPayData = await cambiosPayScraping.getDollarPrice();
        name = `Dólar Paypal - CambiosPay`;
        if(cambiosPayData.dolar) {
            price = `\nPrecio: ${cambiosPayData.dolar}`;
            updatedAtFormat = Moment(cambiosPayData.fecha).utcOffset('-04:00').format('dddd, MMMM Do YYYY, h:mm:ss a');
            updatedAt = `\nÚltima Actualización: ${updatedAtFormat}`;
            result = `${name}${price}${updatedAt}`;
        }else{
            result = `${name} Lo sentimos, no pudimos obtener información de CambiosPay`;
        }

        return result;
    }

    async calculatePaypalFees(amount) {

        let title, amountWithFee, amountFinalFee, amountReceived, amountToSent, fee, amountToReceived = 0;
    
        amountWithFee = this.paypalFee * amount / 100;
        amountFinalFee = amountWithFee + this.paypalFeeAdditional;
        amountReceived = amount - amountFinalFee;

        title = `Calculo de Comisión de Paypal\n`;
        amountToSent = `\nSe envía: $${amount}`;
        fee = `\nComisión: $${amountFinalFee.toFixed(2)}`;
        amountToReceived = `\nSe recibe: $${amountReceived.toFixed(2)}`;

        return `${title}${amountToSent}${fee}${amountToReceived}\n\n`;
    }

    async currencyConverter(amount, currencies, source) {

        let dollarPrice = 0;
        let exchange = 0;
        let title, currency = '';

        const { data } = await axios.post(`${endpointV1}/dollar/price/${source}`);
        console.log('currencyConverter: ', data);
        dollarPrice = data[0].price;

        if(currencies === 'USD') {
            title = `Conversión de Dólares a Bolivares\n\n`;
            currency = ` Bs`;
            exchange = amount * dollarPrice;
        }

        if(currencies === 'Bs') {
            title = `Conversión de Bolivares a Dolares\n\n`;
            currency = ` USD`;
            exchange = amount / dollarPrice;
        }
        console.log('exchange: ', exchange);

        return `${title}${exchange}${currency}`;
    }

    async getDollarPriceSourcesAllowed() {
        let result = '';
        let name, symbol = '';
    
        const { data } = await axios.get(`${endpointV1}/dollar/price/sources`);
        console.log('getDollarPriceSourcesAllowed: ', data);
        
        result = `Códigos para consultar Precio del Dólar en base a la cotización de tu preferencia\n\n`
        for (let index = 0; index < data.length; index++) {
            name = `${data[index].name}: `;
            symbol = `${data[index].symbol}`;
            result = `${result}${name}${symbol}\n\n`;
        }
        return result;
    }

}

module.exports = DollarService;