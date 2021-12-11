/*
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
*/
const client = require("./client");

async function createOrder({ userId, totalPrice, orderDate, orderStatus = "cart"}) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            INSERT INTO orders("userId", "totalPrice", "orderDate", "orderStatus")
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,
      [userId, totalPrice, orderDate, orderStatus]
    );

    return order;
  } catch (err) {
    throw err;
  }
}

async function getAllOrders() {
  try {
    const {
      rows: allOrders
    } = await client.query(`
            SELECT *
            FROM orders;
        `);

    return allOrders;
  } catch (error) {
    throw error;
  }
}

async function getOrderByProductId(productId) {
  try {
    const {
      rows: [ordersWithProduct],
    } = await client.query(
      `
            SELECT *
            FROM orders AS o
            JOIN product_orders AS po
            ON po."orderId"=o.id
            WHERE po."productId"=$1;
        `,
      [productId]
    );

    return ordersWithProduct;
  } catch (error) {
    throw error;
  }
}

async function getOrderByUserId(userId) {
  try {
    const {
      rows: ordersByUserId
    } = await client.query(
      `
            SELECT *
            FROM orders
            WHERE "userId"=$1;
        `,
      [userId]
    );

    return ordersByUserId;
  } catch (error) {
    throw error;
  }
}

async function getOrderByOrderId(orderId) {
  try {
    const {rows: [order]} = await client.query(`
      SELECT * FROM orders
      WHERE id = $1;
    `, [orderId]);

    return order;
  }
  catch (error) {
    throw error;
  }
}

async function updateOrder(orderId, fields={}) {
  // map over the object's keys, output ===> columnOne=$1, columnTwo=$2, columnThree=$3
  // then use Object.values(fields) to reference updated values inside the SQL query
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

    try {
      if (setString.length > 0) {
        const {rows: [order]} = await client.query(
          `
          UPDATE orders
          SET ${setString}
          WHERE id=${orderId}
          RETURNING *;
         `,
          Object.values(fields)
        );

        return order;
      }
    } catch (error) {
      throw error;
    }
}

module.exports = {
  getAllOrders,
  getOrderByProductId,
  getOrderByUserId,
  createOrder,
  getOrderByOrderId,
  updateOrder
};
