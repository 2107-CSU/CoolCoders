const client = require('./client');

const {
    mockUsers,
    mockProducts,
    mockCategories,
    mockOrders,
    mockReviews
} = require('./mockData');

async function dropTables() {
    try {
        console.log('Starting to drop tables...');

        await client.query(`
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS products_orders;
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS categories;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS users;
        `);

        console.log('Finished dropping tables!');
    }   catch (error) {
        console.error('Error while dropping tables!');

        throw error;
    }
};

async function createTables() {
    try{
        console.log('Starting to build tables...');
        await client.query(`
            CREATE TYPE user_type AS ENUM(
                admin,
                user,
                guest
            );
            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                email NOT NULL UNIQUE VARCHAR(255),
                name NOT NULL VARCHAR(255),
                password NOT NULL VARCHAR(255),
                active DEFAULT true BOOLEAN,
                "userStatus" user_type NOT NULL
            );
            CREATE TYPE status_type AS ENUM(
                wishlist,
                cart,
                processing,
                in_transit,
                delivered
            );
            CREATE TABLE orders(
                id SERIAL PRIMARY KEY,
                "userId" FOREIGN KEY INTEGER REFERENCES user(id),
                "totalPrice" INTEGER NOT NULL,
                "orderDate" DATE NOT NULL,
                "orderStatus" status_type NOT NULL
            );
            CREATE TABLE categories(
                id SERIAL PRIMARY KEY,
                name UNIQUE NOT NULL VARCHAR(255)
            );
            CREATE TABLE products(
                id SERIAL PRIMARY KEY,
                title NOT NULL UNIQUE VARCHAR(255),
                description NOT NULL VARCHAR(255),
                price NOT NULL INTEGER,
                quantity NOT NULL INTEGER,
                active DEFAULT true BOOLEAN,
                "categoryId" NOT NULL INTEGER FOREIGN KEY REFERENCES category(id),
                photo NOT NULL UNIQUE VARCHAR (255)
            );
            CREATE TABLE products_orders(
                id SERIAL PRIMARY KEY,
                "productId" NOT NULL INTEGER REFERENCES  product.id,
                "orderId" NOT NULL INTEGER REFERENCES order.id
                quantity NOT NULL INTEGER,
                "productPrice" NOT NULL INTEGER REFERENCES product.price,
                "totalPrice" NOT NULL INTEGER
            );
            CREATE TABLE reviews(
                id SERIAL PRIMARY KEY,
                "productId" FOREIGN KEY REFERENCES product.id INTEGER,
                "userId" FOREIGN KEY REFERENCES user.id INTEGER,
                rating NOT NULL INTEGER,
                test VARCHAR(255) NOT NULL,
                active DEFAULT TRUE BOOLEAN NOT NULL
            );
        `);
        console.log('Finished creating tables');
    }   catch (error) {
        console.error('Error creating tables');

        throw error;
    }
};

/*
BUILDING FUNCTIONS USING MOCK DATA FROM mockData.js
*/

async function createMockUser() {
    console.log('Starting to create mock users...')
    try {

    }
    catch (error) {

    }
}

async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        // await createTables()
    }
    catch (error) {
        console.log('Error during rebuildDB');
        throw (error);
    }
};

module.exports = {
    rebuildDB
};