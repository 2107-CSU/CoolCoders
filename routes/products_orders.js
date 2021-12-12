//import express package
const express = require('express');

//initialize products_ordersRouter
const products_ordersRouter = express.Router();

//import helper functions
const {requireUser} = require('./utils');

//import db adapters
const {addProductToOrder} = require('../db/products_orders');
const { getProductById } = require('../db');

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

//adds a product to an order, and returns the row
//this endpoint fetches product price from db, and calculates total price
//based on quantity
products_ordersRouter.post('/', requireUser, async (req, res, next) => {
    //destructure required fields from request body
    const {productId, orderId, quantity} = req.body;

    let productPrice, totalPrice;
    let objFields = {};

    try {
        //retrieve the product from db and grab the price
        const product = await getProductById(productId);
        if (product) {
            productPrice = product.price;

            //calculate total price for productOrder
            totalPrice = productPrice * quantity;
        }
        else {
            throw new Error ("Couldn't find a product with that id");
        }

        //add fields to object to pass to db adapter
        objFields = {
            productId, orderId, quantity, productPrice, totalPrice
        }

        const productToOrder = await addProductToOrder(objFields);

        res.send(productToOrder);
    }
    catch (error) {
        next(error);
    }
})

/**
 * PATCH REQUESTS
 */

/**
 * DELETE REQUESTS
 */

module.exports = products_ordersRouter;