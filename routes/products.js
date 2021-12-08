//import express package
const express = require('express');

//initialize productsRouter
const productsRouter = express.Router();

//import db adapters for products
const { getAllActiveProducts, getProductById, createProduct, destroyProduct } = require('../db');

//import helper functions
const {requireUser, requireAdmin} = require('./utils');

/**
 * GET
 */
//returns a list of all active products
productsRouter.get('/', async (req, res, next) => {
    console.log("Under construction...");

    try {
        const products = await getAllActiveProducts();

        res.send(products);
    }
    catch (error) {
        next(error);
    }
})

//returns a product with a specific id
productsRouter.get('/:productId', async (req, res, next) => {
    console.log("Under construction...");

    //destructure fields
    const productId = req.params.productId;
    console.log(productId);

    try {
        const product = await getProductById(productId);

        res.send(product);
    }
    catch (error) {
        next(error);
    }
})


/**
 * POST
 */
//adds a new product and returns it
//this route requires admin privileges

/** for testing purposes, remove requireUser, and requireAdmin
 *  will add these functions again once users table is populated
 */
 productsRouter.post('/', async (req, res, next) => {
    console.log("Under construction...");

    //destructure fields
    const {title, desc, price, qty, categoryId, photo} = req.body;

    try {
        const newProduct = await createProduct({title, desc, price, qty, categoryId, photo})

        res.send(newProduct);

    }
    catch (error) {
        next(error);
    }
})


/**
 * PATCH
 */
//edits a product and returns it
//this route requires admin privileges

/** for testing purposes, remove requireUser, and requireAdmin
 *  will add these functions again once users table is populated
 */
productsRouter.patch('/:productId', async (req, res, next) => {
    console.log("Under construction...");

    const productId = req.params.productId;

    const updateObj = req.body;

    try {
        const updatedProduct = await updatedProduct(productId, updateObj);

        res.send(updatedProduct);
    }
    catch (error) {
        next(error);
    }
})


/**
 * DELETE
 */
//deletes a product
//this route requires admin privileges

/** for testing purposes, remove requireUser, and requireAdmin
 *  will add these functions again once users table is populated
 */
productsRouter.delete('/:productId', async (req, res, next) => {
    console.log("Under construction...");

    const productId = req.params.productId;

    try {
        const deletedProduct = await destroyProduct(productId);

        res.send(deletedProduct);
    }
    catch (error) {
        next(error);
    }

})


module.exports = productsRouter;