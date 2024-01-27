const { telegram: { bot: { replySettingsDefault } } } = require('../../../config');

const inArray = require('../utils/tools/inArray');

const { logErrors } = require('../middlewares/error.handler');

const DollarService = require('../services/dollar.service');

const service = new DollarService();

const regexAmount = /\d{1,9}$/;
const currencyAvailables = [ 'Bs', 'USD' ];
const sourcesAvailables = [ 'VDT', 'VMO', 'VES', 'VCRIP', 'VBIN', 'VEPAY', 'VEUPH', 'VESKR', 'VEAMZ' ];

module.exports = (bot) => bot.command(['currencyConverter', 'currencyconverter'], async (context) => {

    try {
        currencies = '';
        source = '';
        amount = 0;
        payload = context.payload;
        if(payload) {
            console.log(payload);
            payloadSplit = payload.split(' ');
            payloadSplit.forEach(value => {
                if(regexAmount.test(value)) {
                    amount = value;
                }

                if(inArray(value, currencyAvailables)) {
                    currencies = value;
                }

                if(inArray(value, sourcesAvailables)) {
                    source = value;
                }
            });
            console.log('amount: ', amount);
            console.log('currencies: ', currencies);
            console.log('source: ', source);

            if(amount === 0 || currencies === '' || source === '') {
                throw new Error('Missing Parameters');
            }
            
            reply = await service.currencyConverter(amount, currencies, source);
            console.log('response currencyConverter: ', reply);
            context.reply(reply, replySettingsDefault);
        }else{
            throw new Error('Missing Parameters');
        }
    } catch (error) {
        logErrors(context, error);
    }
});