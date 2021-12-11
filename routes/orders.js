//import express package
const express = require('express');

//initialize ordersRouter
const ordersRouter = express.Router();

//import helper functions
const {requireUser} = require('./utils');

//import db adapters
const {getAllOrders, getOrderByUserId, getOrderByOrderId, createOrder} = require('../db');

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

//create an order
ordersRouter.post('/', requireUser, async (req, res, next) => {
    const userId = req.user.id;

    const objFields = {userId, ...req.body};

    console.log(objFields);

    const {orderDate} = objFields;
    console.log(typeof orderDate);

    try {
        const order = await createOrder(objFields);

        res.send(order);
    }
    catch (error) {
        next(error);
    }

})

/**
 * PATCH REQUESTS
 */

//edit an order


/**
 * DELETE REQUESTS
 */

//delete an order


module.exports = ordersRouter;