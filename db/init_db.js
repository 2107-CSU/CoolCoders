// code to build and initialize DB goes here
const client
  // other db methods 
 = require('./client');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order

    // build tables in correct order

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

const { 
  rebuildDB,
 } = require('./seedData');
  rebuildDB()
  .catch(console.error)
  .finally(() => client.end());