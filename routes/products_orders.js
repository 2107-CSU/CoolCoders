//import express package
const express = require('express');

//initialize products_ordersRouter
const products_ordersRouter = express.Router();

//import helper functions
const {requireUser} = require('./utils');

//import db adapters
const {addProductToOrder, updateProductOrder, getProductOrderById, deleteProductOrder} = require('../db/products_orders');
const { getProductById, updateProduct, updateTotalOrderPrice, getOrderByOrderId } = require('../db');

products_ordersRouter.use((req, res, next) => {
    console.log('A request is being made to /products_orders');
    next();
});

//helper function to check and update product quantity
//accepts a product object, and desired quantity
async function manageQuantity(product, quantity) {
    try {
        //check current quantity of product
        const prodQuantity = product.quantity;

        if (prodQuantity >= quantity) {
            //calculate new inventory
            const newProdQuantity = prodQuantity - quantity
            await updateProduct(product.id, {
                quantity: newProdQuantity
            })
        }
        else {
            throw new Error ("Not enough stock to fulfill order");
        }
    }
    catch (error) {
        throw(error);
    }
}

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
            await manageQuantity(product, quantity);

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
products_ordersRouter.patch('/:productOrderId', requireUser, async (req, res, next) => {
    const productOrderId = req.params.productOrderId;

    const {quantity} = req.body;

    if (quantity <= 0) {
        throw new Error("Invalid quantity");
    }

    try {
        //retrieve product_order
        const productOrder = await getProductOrderById(productOrderId);

        const productId = productOrder.productId;

        //retrieve the product from db
        const product = await getProductById(productId);
        if (product) {
            await manageQuantity(product, quantity);

            //grab price
            productPrice = product.price;
            //calculate total price for productOrder
            totalPrice = productPrice * quantity;
        }

        //update product order
        const updated = await updateProductOrder(productOrderId, quantity, totalPrice);

        //update total price for order
        await updateTotalOrderPrice(updated.orderId);

        res.send(updated);

    }
    catch (error) {
        next(error);
    }


})

/**
 * DELETE REQUESTS
 */
//hard deletes and returns a product order
//restores quantities of products and updates total price of order
products_ordersRouter.delete('/:productOrderId', requireUser, async (req, res, next) => {
    const productOrderId = req.params.productOrderId;
    const userId = req.user.id

    try {
        //retrieve the product order
        const productOrder = await getProductOrderById(productOrderId);

        if (!productOrder) {
            throw new Error ("Error finding product_order. Please try again");
        }

        //retrieve the order
        const order = await getOrderByOrderId(productOrder.orderId)

        //verify the user is the owner of the given order
        if (order.userId === userId) {
            //restore quantities of products
            //retrieve product object
            const product = await getProductById(productOrder.productId);
            let inventory = product.quantity;

            //qty of product from current order item
            const orderQty = productOrder.quantity;

            //calculate new inventory
            inventory = orderQty + inventory

            await updateProduct(product.id, {quantity: inventory});

            //remove product order
            const deleted = await deleteProductOrder(productOrderId);

            //update total order price
            await updateTotalOrderPrice(order.id);

            res.send(deleted);
        }
        else {
            throw new Error("Unauthorized");
        }

    }
    catch (error) {
        next(error);
    }
})


module.exports = products_ordersRouter;