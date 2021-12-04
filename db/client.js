// Connect to DB

const { Client } = require('pg');
const client = new Client(DB_URL);

const DB_NAME = 'capstone-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;

module.exports = client;