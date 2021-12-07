// code to build and initialize DB goes here
const client = require('./client');

const {rebuildDB} = require('./seedData');

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());