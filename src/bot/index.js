const { Telegraf } = require('telegraf');

const { telegram: { bot: { token } } } = require('../../config');
const cronJobs = require('./cronJobs');
const auth = require('./middlewares/auth.handler');
const isBot = require('./middlewares/isBot.handler');
const start = require('./commands/startCommand');
const register = require('./commands/registerCommand');
const updateDollarPrice = require('./commands/updateDollarPriceCommand');
const updateTdpQaLegacyToken = require('./commands/updateTdpQaLegacyToken');
const calculatePaypalFees = require('./commands/calculatePaypalFees');

const bot = new Telegraf(token);

// Commands Without Middlewares
start(bot);
register(bot);
calculatePaypalFees(bot);

// Middlewares
isBot(bot);
auth(bot);

// Commands With Middlewares
updateDollarPrice(bot);
updateTdpQaLegacyToken(bot);

// CronJobs
cronJobs(bot);

// Other Actions
bot.mention('BotFather', (context) => {
    console.log(context);
    context.reply('Haz mencionado al usuario BotFather');
    context.sendMessage()
});

bot.hashtag('programming', context => {
    context.reply('Este hashtag es tu favorito');
});

// Launch Bot
bot.launch();