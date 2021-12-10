const client = require("./client");

const productDbAdapters = require("./products");
const userDbAdapters = require("./user");
const ordersDbAdapters = require('./orders')

module.exports = {
  client,
  ...productDbAdapters,
  ...userDbAdapters,
  ...ordersDbAdapters
};
