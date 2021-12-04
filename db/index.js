

const productDbAdapters = require('./products');
// const userDbAdapters = require('./user');
// const ordersDbAdapters = require('./orders')

module.exports = {
  ...productDbAdapters
  // ...userDbAdapters,
  // ...ordersDbAdapters
}