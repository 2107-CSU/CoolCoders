//import express package
const express = require('express');

//initialize ordersRouter
const ordersRouter = express.Router();

//import helper functions
const {} = require('./utils');

//import db adapters
const {getAllOrders} = require('../db');

/**
 * GET REQUESTS
 */

//returns a list of all orders
ordersRouter.get('/', async (req, res, next) => {
    console.log("Under Construction...");
    try {
        const orders = await getAllOrders();

        res.send(orders);
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