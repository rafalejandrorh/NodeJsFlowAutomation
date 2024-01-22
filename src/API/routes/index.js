const express = require('express');

const usersRoutes = require('./users.routes');
const authRoutes = require('./auth.routes');
const dollarRoutes = require('./dollar.routes');
const sdcRoutes = require('./sdc.routes');
const commandsRoutes = require('./commands.routes');
const mailRoutes = require('./mail.routes');

function routes(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/users', usersRoutes);
    router.use('/auth', authRoutes);
    router.use('/dollar', dollarRoutes);
    router.use('/SDC', sdcRoutes);
    router.use('/commands', commandsRoutes);
    router.use('/mail', mailRoutes);
}

module.exports = routes;
