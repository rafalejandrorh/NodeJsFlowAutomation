const { Sequelize } = require('sequelize');

const config = require('../config');
const setupModels = require('../db/models');

const options = {
    dialect: 'postgres',
    logging: false,
}

if (config.isProd) {
    options.dialectOptions = {
        ssl: {
            rejectUnauthorized: false
        }
    }
}

const sequelize = new Sequelize(config.postgresql.url, options);

setupModels(sequelize);

module.exports = sequelize;
