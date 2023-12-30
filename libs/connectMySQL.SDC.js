// Probar el debug
//const debug = require('debug')('app:database');
const config = require('../config');
const mysql = require('mysql2');
const connection = mysql.createConnection(config.sdc.mysql.qa.url);

console.log('Connected to database from SDC');
//debug('Connected to database');

module.exports = connection;