//import express package
const express = require('express');

//initialize productsRouter
const productsRouter = express.Router();

//import db adapters for products
const { getAllProducts, getProductById, createProduct, destroyProduct, updateProduct } = require('../db');

//import helper functions
const {requireUser, requireAdmin} = require('./utils');

/**
 * GET
 */
//returns a list of all active products
productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await getAllProducts();

        res.send(products);
    }
    catch (error) {
        next(error);
    }
})

//returns a product with a specific id
productsRouter.get('/:productId', async (req, res, next) => {
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
 productsRouter.post('/', requireAdmin, async (req, res, next) => {
    const {title, description, price, quantity, categoryId, photo} = req.body;

    try {
        const newProduct = await createProduct({ title, description, price, quantity, categoryId, photo });
        console.log('newProduct = ', newProduct);

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
productsRouter.patch('/:productId', requireUser, requireAdmin, async (req, res, next) => {
    const productId = req.params.productId;

    //copy the fields to update into a new object
    const updateObj = {...req.body};

    try {
        const updated = await updateProduct(productId, updateObj);

        res.send(updated);
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
productsRouter.delete('/:productId', requireUser, requireAdmin, async (req, res, next) => {
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