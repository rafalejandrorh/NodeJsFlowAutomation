const Moment = require('moment');
const axios = require('axios');

const { API: { V1: { endpoint : endpointV1 } } } = require('../../../config') 

//const ExchangeVcoudService = require('../../API/services/dollar.service');

class DollarService {

    constructor() {
        //this.service = new ExchangeVcoudService();
        Moment.locale('es');
        this.paypalFee = 5.4;
    }

    async getDollarPrice() {
        let result = '';
        let name, price, updatedAt = '';
    
        //const dollarPrice = await this.service.getDollarPrice();
        const { data } = await axios.get(`${endpointV1}/dollar/price/`);
        console.log('getDollarPrice: ', data);
    
        for (let index = 0; index < data.length; index++) {
            name = `${data[index].name}`;
            //name.replace(/\./g, "\\\\.");
    
            price = `\nPrecio: ${data[index].price}`;
            //price.replace(/\./g, "\\\\.")
    
            let updatedAtFormat = Moment(data[index].updatedAt).utcOffset('-04:00').format('dddd, MMMM Do YYYY, h:mm:ss a');
            updatedAt = `\nÚltima Actualización: ${updatedAtFormat}`;
    
            result = `${result}${name}${price}${updatedAt}\n\n`;
        }

        return result;
    }

    async calculatePaypalFees(amount) {

        let title, amountWithFee, amountFinalFee, amountReceived, amountToSent, fee, amountToReceived = 0;
    
        amountWithFee = this.paypalFee * amount / 100;
        amountFinalFee = amountWithFee + 0.30;
        amountReceived = amount - amountFinalFee;

        title = `Calculo de Comisión de Paypal\n`;
        amountToSent = `\nSe envía: $${amount}`;
        fee = `\nComisión: $${amountFinalFee.toFixed(2)}`;
        amountToReceived = `\nSe recibe: $${amountReceived.toFixed(2)}`;

        return `${title}${amountToSent}${fee}${amountToReceived}\n\n`;
    }

}

module.exports = DollarService;