const client = require("./client");

const {
    mockUsers,
    mockProducts,
    // mockCategories,
    mockOrders,
    // mockReviews
} = require('./mockData');

async function dropTables() {
    try {
        console.log('Starting to drop tables...');

        await client.query(`
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS products_orders;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS categories;
            DROP TABLE IF EXISTS users; 
        `);

<<<<<<< HEAD


        //also need to drop types otherwise you'll get an error message saying the type already exists
=======
>>>>>>> 83a8962aeb83eda57ca30ef09662d0f5d8f72bd4
        await client.query(`
            DROP TYPE IF EXISTS user_type;
            DROP TYPE IF EXISTS status_type;
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
                "userStatus" user_type NOT NULL
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
                description VARCHAR(255) NOT NULL,
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
                test VARCHAR(255) NOT NULL,
                active BOOLEAN DEFAULT true NOT NULL
            );
        `)
        console.log('Finished creating tables');
    }   catch (error) {
        console.error('Error creating tables');

        throw error;
    };
};



/*
BUILDING FUNCTIONS USING MOCK DATA FROM mockData.js
*/

async function createInitialUsers() {
   console.log('Starting to create mock users...');
   try { 
       const users = await Promise.all(mockUsers.map(createUser));

       console.log('Users created:');
       console.log(users);
       console.log('Finished creating users!');
   }   catch (error) {
       console.error('Error ceating users!');
   }   throw error;
};

async function createInitialProducts() {
    try {
        console.log('Starting to create products...');

        const products = await Promise.all(mockProducts.map(createProduct));

        console.log('Products created:');
        console.log(products);

        console.log('Finished creating products!');
    }   catch (error) {
        console.error('Error creating products!');
        throw error;
    }   
};

// async function createInitialCategories() {
//     try {
//         console.log('Starting to create categories...');

//         const categories = await Promise.all(mockCategories.map(createCategories));

//         console.log('Categories created:');
//         console.log(categories);

//         console.log('Finished creating categories!');
//     }   catch (error) {
//         console.error('Error creating categories!');
//         throw error;
//     }   
// };

async function createInitialOrders() {
    try {
        console.log('Starting to create orders...');

        const orders = await Promise.all(mockOrders.map(getAllOrders));

        console.log('Orders created:');
        console.log(orders);

        console.log('Finished creating orders!');
    }   catch (error) {
        console.error('Error creating orders!');
        throw error;
    }   
};

// async function createInitialReviews() {
//     try {
//         console.log('Starting to create reviews...');

//         const reviews = await Promise.all(mockReviews.map(createReviews));

//         console.log('Reviews created:');
//         console.log(reviews);

//         console.log('Finished creating reviews!');
//     }   catch (error) {
//         console.error('Error creating reviews!');
//         throw error;
//     }   
// };


async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables()
        // await createInitialUsers();
        // await createInitialProducts();
        // await createInitialCategories();
        // await createInitialOrders();
        // await createInitialReviews();
    }   catch (error) {
        console.log('Error during rebuildDB');
        throw (error);
    }
};

module.exports = {
    rebuildDB
};