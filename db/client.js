// Connect to DB

const { Client } = require('pg');

const DB_NAME = 'capstone-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;

<<<<<<< HEAD
const { Client } = require('pg');
=======
const client = new Client(DB_URL);
>>>>>>> 83a8962aeb83eda57ca30ef09662d0f5d8f72bd4

module.exports = client;