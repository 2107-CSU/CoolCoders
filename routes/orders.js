//import express package
const express = require("express");

//initialize ordersRouter
const ordersRouter = express.Router();

//import helper functions
const { requireUser } = require("./utils");

//import db adapters
const {
  getAllOrders,
  getOrderByUserId,
  getOrderByOrderId,
  createOrder,
  updateOrder,
  getUserById,
} = require("../db");

/**
 * GET REQUESTS
 */

//returns a list of all orders
ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();

    res.send(orders);
  } catch (error) {
    next(error);
  }
});

//returns a list of orders for a given user id
ordersRouter.get("/:userId/users", async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const orders = await getOrderByUserId(userId);

    res.send(orders);
  } catch (error) {
    next(error);
  }
});

//returns an order with a matching id
// may want to restrict it to user that owns the order and/or admin
ordersRouter.get("/:orderId", async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const order = await getOrderByOrderId(orderId);

    res.send(order);
  } catch (error) {
    next(error);
  }
});

/**
 * POST REQUESTS
 */

//create an order
ordersRouter.post("/", requireUser, async (req, res, next) => {
  const userId = req.user.id;

  const objFields = { userId, ...req.body };

  try {
    const order = await createOrder(objFields);

    res.send(order);
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH REQUESTS
 */

//edit an order
ordersRouter.patch("/:orderId", requireUser, async (req, res, next) => {
  const userId = req.user.id;

  const orderId = req.params.orderId;

  const objFields = { ...req.body };

  try {
    //determine if logged in user is the owner of an order
    const orderToUpdate = await getOrderByOrderId(orderId);

    if (orderToUpdate) {
      if (orderToUpdate.userId !== userId) {
        throw new Error("You must be the owner of an order to edit");
      }

      //determine if order status will allow edits
      if (
        orderToUpdate.orderStatus === "in_transit" ||
        orderToUpdate.orderStatus === "delivered"
      ) {
        throw new Error("Cannot edit an order after its been processed");
      }
    }

    //otherwise update the order
    const order = await updateOrder(orderId, objFields);

    res.send(order);
  } catch (error) {
    next(error);
  }
});

// use this route to update user id of order if user logs in after continuing as guest
ordersRouter.patch("/:orderId/user", requireUser, async (req, res, next) => {
  const userId = req.user.id;
  const orderId = req.params.orderId;

  try {
    const [orderToUpdate] = await getOrderByOrderId(orderId);
    console.log(orderToUpdate);
    const prevUserId = orderToUpdate.userId;
    const prevUser = await getUserById(prevUserId);
    console.log(prevUser);
    if (prevUser.active === false && orderToUpdate.orderStatus === "cart") {
      const order = await updateOrder(orderId, { userId: userId });
      res.send(order);
    } else {
      throw new Error("This order cannot be updated.");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = ordersRouter;
