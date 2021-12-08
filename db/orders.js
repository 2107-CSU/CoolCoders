
async function getAllOrders(){
    try {
        const { rows: [allOrders] } = await client.query(`
            SELECT *
            FROM orders;
        `)

        return allOrders;
    } catch (error) {
        throw error;
    }
}

async function getOrderByProductId(productId){
    try {
        const { rows: [ordersWithProduct] } = await client.query(`
            SELECT *
            FROM orders AS o
            JOIN product_orders AS po
            ON po."orderId"=o.id
            WHERE po."productId"=$1;
        `, [productId]);

        return ordersWithProduct;
    } catch (error) {
        throw error;
    }
}

async function getOrderByUsername(userId){
    try {
        const { rows: [ordersByUserId] } = await client.query(`
            SELECT *
            FROM orders
            WHERE "userId"=$1;
        `, [userId])

        return ordersByUserId;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllOrders, 
    getOrderByProductId,
    getOrderByUsername
}