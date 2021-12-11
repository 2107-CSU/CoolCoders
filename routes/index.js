//import jwt package
const jwt = require('jsonwebtoken');
//import passphrase
const {JWT_SECRET} = process.env;

//initialize apiRouter
const apiRouter = require('express').Router();

//import db adapter to retrieve user.
//this function is used to verify the JWT
const { getUserById } = require('../db');

//JWT verifier
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  //check for authorization in the header object
  if(!auth) {
      //if there is no authorization move onto the next middleware
      next();
  }
  else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);

      try {
          //attempt to verify token and destructure the id from the return data
          const {id} = jwt.verify(token, JWT_SECRET);

          if (id) {
              //if a valid user is returned, add it to the request object
              req.user = await getUserById(id);

              //then move to the next middleware
              next();
          }
      }
      catch (error) {
          next(error);
      }
  }
})

/**
 * apiRouter will set up a tree of routes. It will match paths then pass the request along to the appropriate middleware
 */
//respond to requests made to /api/health
apiRouter.get('/health', (req, res, next) => {
  res.status(200).send({
      message: "api online!" });
})

//PRODUCTS ROUTER
const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

//ORDERS ROUTER
const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);

//USERS ROUTER
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
