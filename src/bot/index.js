const { Telegraf } = require('telegraf');

const { telegram: { bot: { token } } } = require('../../config');
const cronJobs = require('./cronJobs');
const auth = require('./middlewares/auth.handler');
const isBot = require('./middlewares/isBot.handler');
const commands = require('./commands/commands');
const start = require('./commands/startCommand');
const register = require('./commands/registerCommand');
const getDollarPrice = require('./commands/getDollarPriceCommand');
const getDollarPriceCambiosPay = require('./commands/getDollarPriceCambiosPayCommand');
const updateTdpQaLegacyToken = require('./commands/updateTdpQaLegacyTokenCommand');
const calculatePaypalFees = require('./commands/calculatePaypalFeesCommand');
const currencyConverter = require('./commands/currencyConverterCommand');
const getDollarPriceSourcesAllowed = require('./commands/getDollarSourcesAllowedCommand');

const bot = new Telegraf(token);

// Commands Without Middlewares
commands(bot);
start(bot);
register(bot);
calculatePaypalFees(bot);
currencyConverter(bot);
getDollarPriceSourcesAllowed(bot);

// Middlewares
isBot(bot);
auth(bot);

// Commands With Middlewares
getDollarPrice(bot);
getDollarPriceCambiosPay(bot);
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