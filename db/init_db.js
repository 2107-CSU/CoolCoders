// code to build and initialize DB goes here
const { client } = require("./index");

const {
  createInitialUsers,
  createInitialCategories,
  createInitialProducts,
  createInitialOrders,
} = require("./seedData");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS products_orders;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS categories;
            DROP TABLE IF EXISTS users;
        `);

    await client.query(`
            DROP TYPE IF EXISTS user_type;
            DROP TYPE IF EXISTS status_type;
        `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error while dropping tables!");

    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");
    await client.query(`
            CREATE TYPE user_type AS ENUM(
                'admin',
                'user',
                'guest'
            );
            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                name VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                active BOOLEAN DEFAULT true,
                "userStatus" user_type DEFAULT 'user' NOT NULL
            );
            CREATE TYPE status_type AS ENUM(
                'wishlist',
                'cart',
                'processing',
                'in_transit',
                'delivered'
            );
            CREATE TABLE orders(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER,
                FOREIGN KEY ("userId") REFERENCES users(id),
                "totalPrice" INTEGER NOT NULL,
                "orderDate" DATE NOT NULL,
                "orderStatus" status_type NOT NULL
            );
            CREATE TABLE categories(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL
            );
            CREATE TABLE products(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) UNIQUE NOT NULL,
                description TEXT NOT NULL,
                price INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                active BOOLEAN DEFAULT true,
                "categoryId" INTEGER NOT NULL,
                FOREIGN KEY ("categoryId") REFERENCES categories(id),
                photo VARCHAR(255) NOT NULL
            );
            CREATE TABLE products_orders(
                id SERIAL PRIMARY KEY,
                "productId" INTEGER REFERENCES products(id) UNIQUE NOT NULL,
                "orderId" INTEGER REFERENCES orders(id) NOT NULL,
                quantity INTEGER NOT NULL,
                "productPrice" INTEGER NOT NULL,
                "totalPrice" INTEGER NOT NULL
            );
            CREATE TABLE reviews(
                id SERIAL PRIMARY KEY,
                "productId" INTEGER,
                FOREIGN KEY ("productId") REFERENCES products(id),
                "userId" INTEGER,
                FOREIGN KEY ("userId") REFERENCES users(id),
                rating INTEGER NOT NULL,
                text VARCHAR(255) NOT NULL,
                active BOOLEAN DEFAULT true NOT NULL
            );
        `);
    console.log("Finished creating tables");
  } catch (error) {
    console.error("Error creating tables");

    throw error;
  }
}

async function buildTables() {
  try {
    await dropTables();

    await createTables();
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    await createInitialUsers();
    await createInitialCategories();
    await createInitialProducts();
    // orders
    await createInitialOrders();
    // reviews
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await buildTables();
    await populateInitialData();
    console.log("Finished rebuilding db!");
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
