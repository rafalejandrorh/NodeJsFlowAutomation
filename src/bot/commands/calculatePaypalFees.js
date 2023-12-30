const { telegram: { bot: { replySettingsDefault } } } = require('../../../config');

const DollarService = require('../services/dollar.service');

const service = new DollarService();

const regexAmount = /\d{1,9}$/;

module.exports = (bot) => bot.command(['calculatePaypalFees', 'calculatepaypalfees'], async (context) => {

    try {

        amount = 0;
        payload = context.payload;
        if(payload) {
            console.log(payload);
            payloadSplit = payload.split(' ');
            payloadSplit.forEach(value => {
                
                if(regexAmount.test(value)) {
                    amount = value;
                }
            });
            console.log('amount: ', amount);

            reply = await service.calculatePaypalFees(amount);
            console.log('response calculatePaypalFees: ', reply);
            context.reply(reply, replySettingsDefault);
        }
    } catch (error) {
        console.log(error);
        context.reply(`Lo sentimos! Ha ocurrido un error`);
    }
});