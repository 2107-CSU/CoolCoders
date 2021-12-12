//import express package
const express = require('express');

//initialize products_ordersRouter
const products_ordersRouter = express.Router();

//import helper functions
const {} = require('./utils');

//import db adapters
const {} = require('../db/products_orders');

products_ordersRouter.use((req, res, next) => {
    console.log('A request is being made to /products_orders');
    next();
});

/**
 * GET REQUESTS
 */

/**
 * POST REQUESTS
 */

/**
 * PATCH REQUESTS
 */

/**
 * DELETE REQUESTS
 */

module.exports = products_ordersRouter;