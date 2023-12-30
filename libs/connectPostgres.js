const { Pool } = require('pg');
const config = require('../config')

const pool = new Pool({
  user: config.postgresql.user,
  host: config.postgresql.host,
  database: config.postgresql.database,
  password: config.postgresql.password,
  port: config.postgresql.port,
});

module.exports = pool;