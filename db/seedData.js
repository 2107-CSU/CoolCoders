const {
  mockUsers,
  mockProducts,
  mockCategories,
  mockOrders,
  mockReviews,
} = require("./mockData");

const { createUser } = require("./user");
const { createCategory } = require("./categories");
const { createProduct } = require("./products");
const { createOrder } = require("./orders");
const { createReview } = require("./reviews");

/*
BUILDING FUNCTIONS USING MOCK DATA FROM mockData.js
*/

async function createInitialUsers() {
  console.log("Starting to create mock users...");
  try {
    const users = await Promise.all(mockUsers.map((user) => createUser(user)));

    // console.log("Users created:");
    // console.log(users);
    console.log("Finished creating users!");
    return users;
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialCategories() {
  try {
    console.log("Starting to create categories...");

    const categories = await Promise.all(
      mockCategories.map((category) => createCategory(category))
    );

    // console.log("Categories created:");
    // console.log(categories);

    console.log("Finished creating categories!");
    return categories;
  } catch (error) {
    console.error("Error creating categories!");
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log("Starting to create products...");

    const products = await Promise.all(
      mockProducts.map((product) => createProduct(product))
    );

    // console.log("Products created:");
    // console.log(products);

    console.log("Finished creating products!");
    return products;
  } catch (error) {
    console.error("Error creating products!");
    throw error;
  }
}

async function createInitialOrders() {
  try {
    console.log("Starting to create orders...");

    const orders = await Promise.all(
      mockOrders.map((order) => createOrder(order))
    );

    // console.log("Orders created:");
    // console.log(orders);

    console.log("Finished creating orders!");
    return orders;
  } catch (error) {
    console.error("Error creating orders!");
    throw error;
  }
}

async function createInitialReviews() {
  try {
    console.log("Starting to create reviews...");

    const reviews = await Promise.all(
      mockReviews.map((review) => createReview(review))
    );

    // console.log("Reviews created:");
    // console.log(reviews);

    console.log("Finished creating reviews!");
    return reviews;
  } catch (error) {
    console.error("Error creating reviews!");
    throw error;
  }
}

module.exports = {
  createInitialUsers,
  createInitialCategories,
  createInitialProducts,
  createInitialOrders,
  createInitialReviews,
};
