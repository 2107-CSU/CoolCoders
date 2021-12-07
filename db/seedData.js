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

        //also need to drop types otherwise you'll get an error message saying the type already exists
        await client.query(`
            DROP TYPE IF EXISTS user_type;
        `)

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
            CREATE TYPE user_type AS ENUM (
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
                userStatus user_type NOT NULL
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
        await createTables()
    }
    catch (error) {
        console.log('Error during rebuildDB');
        throw (error);
    }
};

module.exports = {
    rebuildDB
};