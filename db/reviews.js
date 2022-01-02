const client = require("./client");

/* 
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
*/

async function createReview({ productId, userId, rating, text, active }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
            INSERT INTO reviews("productId", "userId", rating, text, active)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `,
      [productId, userId, rating, text, active]
    );

    return review;
  } catch (err) {
    throw err;
  }
}

module.exports = { createReview };
