//import jwt package
const jwt = require('jsonwebtoken');
//import passphrase
const {JWT_SECRET} = process.env;

// import stripe, call it and pass in our private key
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

//initialize apiRouter
const apiRouter = require('express').Router();

//import db adapter to retrieve user.
//this function is used to verify the JWT
const { getUserById, getProductById } = require('../db');

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
          const {id, userStatus} = jwt.verify(token, JWT_SECRET);

          if (id) {
              //if a valid user is returned, add it to the request object
              req.user = await getUserById(id);
              // if userStatus = admin, add a key to the req.user object
              if (userStatus === 'admin') {
                req.user.admin = true;
              }
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

// incorporating stripe server side
apiRouter.post('/create-checkout-session', async (req, res) => {
    try {
        let line_items = [];
        for (let i = 0; i < req.body.items.length; i++) {
            const currentProduct = await getProductById(req.body.items[i].id);
            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: currentProduct.title
                    },
                    unit_amount: currentProduct.price
                },
                quantity: currentProduct.quantity
            })
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: [ 'card' ],
            mode: 'payment',
            line_items: line_items,
            success_url:`http://localhost:3000/products`,
            cancel_url:`http://localhost:3000/cart`
        })
        res.send({ url: session.url })
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
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

//PRODUCTS_ORDERS ROUTER
const products_ordersRouter = require('./products_orders');
apiRouter.use('/products_orders', products_ordersRouter);

module.exports = apiRouter;
