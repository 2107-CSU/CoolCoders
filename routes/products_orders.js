//import express package
const express = require('express');

//initialize products_ordersRouter
const products_ordersRouter = express.Router();

//import helper functions
const {requireUser} = require('./utils');

//import db adapters
const {addProductToOrder} = require('../db/products_orders');
const { getProductById, updateProduct, updateTotalOrderPrice } = require('../db');

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
//this endpoint updates quantity in products table,
//and total price in orders table
products_ordersRouter.post('/', requireUser, async (req, res, next) => {
    //destructure required fields from request body
    const {productId, orderId, quantity} = req.body;

    let productPrice, totalPrice;
    let objFields = {};

    try {
        //retrieve the product from db
        const product = await getProductById(productId);
        if (product) {
            //check current quantity of product
            let prodQuantity = product.quantity;

            if (prodQuantity >= quantity) {
                //calculate new inventory
                let newProdQuantity = prodQuantity - quantity
                await updateProduct(productId, {
                    quantity: newProdQuantity
                })
            }
            else {
                throw new Error ("Not enough stock to fulfill order");
            }

            //grab price
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
        //add product to order
        const productToOrder = await addProductToOrder(objFields);

        //update total price for order
        await updateTotalOrderPrice(orderId);

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