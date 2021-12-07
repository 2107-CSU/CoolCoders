// Connect to DB
const DB_NAME = 'capstone-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;

const { Client } = require('pg');
const client = new Client(DB_URL);

module.exports = client;