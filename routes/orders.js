//import express package
const express = require('express');

//initialize ordersRouter
const ordersRouter = express.Router();

//import helper functions
const {} = require('./utils');

//import db adapters
const {getAllOrders, getOrderByUserId, getOrderByOrderId} = require('../db');

/**
 * GET REQUESTS
 */

//returns a list of all orders
ordersRouter.get('/', async (req, res, next) => {
    try {
        const orders = await getAllOrders();

        res.send(orders);
    }
    catch (error) {
        next(error);
    }
})

//returns a list of orders for a given user id
ordersRouter.get('/:userId/users', async (req, res, next) => {
    console.log("RETURN A LIST OF A USERS ORDERS")
    const userId = req.params.userId;

    try {
        const orders = await getOrderByUserId(userId);

        res.send(orders);
    }
    catch (error) {
        next(error);
    }

})

//returns an order with a matching id
ordersRouter.get('/:orderId', async (req, res, next) => {
    const orderId = req.params.orderId;

    try {
        const order = await getOrderByOrderId(orderId);

        res.send(order);
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