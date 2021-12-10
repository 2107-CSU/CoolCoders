//import express package
const express = require('express');

//initialize ordersRouter
const ordersRouter = express.Router();

//import helper functions
const {} = require('./utils');

//import db adapters
const {} = require('../db');

/**
 * GET REQUESTS
 */
ordersRouter.get('/', async (req, res, next) => {
    console.log("Under Construction...");
    try {

    }
    catch (error) {
        next(error);
    }
})


/**
 * POST REQUESTS
 */


/**
 * PATCH REQUESTS
 */


/**
 * DELETE REQUESTS
 */


module.exports = ordersRouter;