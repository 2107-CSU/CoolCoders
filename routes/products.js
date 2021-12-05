//import express package
const express = require('express');

//initialize productsRouter
const productsRouter = express.Router();

//import db adapters for products
const {} = require('../db');

//import helper functions
const requireUser = require('./utils');

/**
 * GET
 */
//returns a list of products
productsRouter.get('/', async (req, res, next) => {
    console.log("Under construction...");
    try {

    }
    catch (error) {

    }
})


/**
 * POST
 */
//add a new product and return it
//this route will require an active user
 productsRouter.post('/', requireUser, async (req, res, next) => {
    console.log("Under construction...");
    try {

    }
    catch (error) {

    }
})


/**
 * PATCH
 */


/**
 * DELETE
 */


module.exports = productsRouter;