const config = require('../config');

module.exports = {
    development: {
        url: config.postgresql.url,
        dialect: 'postgres',
    },
    test: {
        url: config.postgresql.url,
        dialect: 'postgres',
    },
    production: {
        url: config.postgresql.url,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
        }
    }
}
