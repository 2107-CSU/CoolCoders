//import express package
const express = require('express');

//initialize productsRouter
const productsRouter = express.Router();

//import db adapters for products
const { getAllProducts } = require('../db');

//import helper functions
const {requireUser, requireAdmin} = require('./utils');

/**
 * GET
 */
//returns a list of products
productsRouter.get('/', async (req, res, next) => {
    console.log("Under construction...");
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
    console.log("Under construction...");
    try {

    }
    catch (error) {

    }
})


/**
 * POST
 */
//adds a new product and returns it
//this route requires admin privileges
 productsRouter.post('/', requireUser, requireAdmin, async (req, res, next) => {
    console.log("Under construction...");
    try {

    }
    catch (error) {

    }
})


/**
 * PATCH
 */
//edits a product and returns it
//this route requires admin privileges
productsRouter.patch('/:productId', requireUser, requireAdmin, async (req, res, next) => {
    console.log("Under construction...");
    try {

    }
    catch (error) {

    }
})


/**
 * DELETE
 */
//deletes a product
//this route requires admin privileges
productsRouter.delete('/:productId', requireUser, requireAdmin, async (req, res, next) => {
    console.log("Under construction...");
    try {

    }
    catch (error) {

    }

})


module.exports = productsRouter;