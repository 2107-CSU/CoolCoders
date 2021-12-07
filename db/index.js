
// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'capstone-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);


const productDbAdapters = require('./products');
// const userDbAdapters = require('./user');
// const ordersDbAdapters = require('./orders')

module.exports = {
  ...productDbAdapters
  // ...userDbAdapters,
  // ...ordersDbAdapters
}