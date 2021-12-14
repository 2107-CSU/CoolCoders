const client = require("./client");

const productDbAdapters = require("./products");
const userDbAdapters = require("./user");
const ordersDbAdapters = require("./orders");
const categoriesDbAdapters = require("./categories");
const productOrderDbAdapters = require("./products_orders");

module.exports = {
  client,
  ...productDbAdapters,
  ...userDbAdapters,
  ...ordersDbAdapters,
  ...categoriesDbAdapters,
  ...productOrderDbAdapters,
};
