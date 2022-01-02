const client = require("./client");

async function createCategory({ name }) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
            INSERT INTO categories(name)
            VALUES($1)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `,
      [name]
    );
    return category;
  } catch (err) {
    throw err;
  }
}

async function getCategoryById(id) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
            SELECT * FROM categories
            WHERE id=$1;
        `,
      [id]
    );
    return category;
  } catch (err) {
    throw err;
  }
}

module.exports = { createCategory, getCategoryById };
