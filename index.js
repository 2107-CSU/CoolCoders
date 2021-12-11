//import .env package to use environment variables
require('dotenv').config();

// This is the Web Server
const express = require('express');
const server = express();

// create logs for everything
const morgan = require('morgan');
server.use(morgan('dev'));

// handle application/json requests
server.use(express.json());

// here's our static files
const path = require('path');
server.use(express.static(path.join(__dirname, 'build')));

//Import and use cors middleware
const cors = require('cors');
server.use(cors());

// here's our API
//import and use api router
const apiRouter = require('./routes');
//this will handle all routes made to the /api/... URL
server.use('/api', apiRouter);

// by default serve up the react app if we don't recognize the route
// server.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'))
// });

// bring in the DB connection
const {client} = require('./db');

//404 handler
// server.use((req, res, next) => {
//   res.status(404).send('Page not found');
// })

//Error handler that sets the status code to 500
//and returns the error as an object
server.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send(error);
})

// connect to the server
const PORT = process.env.PORT || 2345;
server.listen(PORT, async () => {
  console.log(`Server is running on ${ PORT }!`);

  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});