const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'senha123',
  database: process.env.DB_NAME || 'minibanco',
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;
