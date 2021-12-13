const client = require("./client");

/**
 * CREATE TABLE products_orders(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id) NOT NULL,
        "orderId" INTEGER REFERENCES orders(id) NOT NULL,
        quantity INTEGER NOT NULL,
        "productPrice" DECIMAL NOT NULL,
        "totalPrice" DECIMAL NOT NULL,
        UNIQUE ("productId", "orderId")
    );
 */

//returns a product_order given a specific id
async function getProductOrderById(id) {
    try {
        const {rows: [productOrder]} = await client.query(`
            SELECT * FROM products_orders
            WHERE id = $1;
        `, [id]);

        return productOrder;
    }
    catch (error) {
        throw error;
    }
}

//returns a list of products for a given order
async function getProductsByOrder(orderId) {
    try {
        const {rows: orderProducts} = await client.query(`
            SELECT * FROM products_orders
            WHERE "orderId" = ${orderId};
        `);

        return orderProducts;
    }
    catch (error) {
        throw error;
    }
}

//creates a new product_order entry and returns it
async function addProductToOrder({productId, orderId, quantity, productPrice, totalPrice}) {
    try {
        const {rows: [productToOrder]} = await client.query(`
            INSERT INTO products_orders
            ("productId","orderId", quantity, "productPrice", "totalPrice")
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT ("productId", "orderId") DO NOTHING
            RETURNING *;
        `, [productId, orderId, quantity, productPrice, totalPrice]);

        if (productToOrder) {
            return productToOrder;
        }
        else {
            throw new Error("Error adding item to order");
        }
    }
    catch (error) {
        throw error;
    }
}

//updates a product order quantity. new quantity cannot be set to 0
async function updateProductOrder(id, quantity, totalPrice) {
    try {
        const {rows: [productOrder]} = await client.query(`
            UPDATE products_orders
            SET "quantity"=$1, "totalPrice"=$2
            WHERE id = ${id}
            RETURNING *;
        `, [quantity, totalPrice]);

        return productOrder;
    }
    catch (error) {
        throw error;
    }
}

//hard deletes a product order
async function deleteProductOrder(id) {
    try {
        const {rows: [deleted]} = await client.query(`
            DELETE FROM products_orders
            WHERE id = ${id}
            RETURNING *;
        `);

        return deleted;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    getProductOrderById,
    addProductToOrder,
    updateProductOrder,
    deleteProductOrder,
    getProductsByOrder
}