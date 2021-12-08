const { client } = require("./client");

async function getProductById(productId){
    try {
      const { rows: [product] } = await client.query(`
        SELECT *
        FROM products
        WHERE id=$1;
      `, [productId])

      if (!product) {
        throw {
          name: "ProductCouldNotBeFound",
          message: "Could not find a product with that productId"
        }
      }

      return product;

    } catch (error) {
      throw error;
    }
  }

  async function getAllProducts(){
    try {
      const { rows: allProducts } = await client.query(`
        SELECT *
        FROM products;
      `)

      return allProducts;
    } catch (error) {
      throw error;
    }
  }

  async function createProduct({ title, desc, price, qty, categoryId, photo }){
    try {
      const { rows: [product] } = await client.query(`
        INSERT INTO products(title, desc, price, qty, categoryId, photo)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `, [title, desc, price, qty, categoryId, photo])

      return product;
    } catch (error) {
      throw error;
    }
  }

  async function updateProduct(productId, fields = {}){
    // map over the object's keys, output ===> columnOne=$1, columnTwo=$2, columnThree=$3
    // then use Object.values(fields) to reference updated values inside the SQL query
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    try {

     if (setString.length > 0) {
       await client.query(`
        UPDATE products
        SET ${ setString }
        WHERE id=${ productId }
        RETURNING *;
       `, Object.values(fields));
     }

     return await getProductById(productId);

    } catch (error) {
      throw error;
    }
  }

  async function destroyProduct(productId){
    try {
      await client.query(`
        UPDATE products
        SET active=false
        WHERE id=$1;
      `, [productId])

      return true;

    } catch (error) {
      throw error;
    }
  }

  async function getProductsByCategory(categoryId){
    try {
      const { rows: [products] } = await client.query(`
      SELECT *
      FROM products
      WHERE "categoryId"=$1;
    `, [categoryId])

    if (!products) {
      throw {
        name: "ProductsCouldNotBeFound",
        message: "Could not find any products with that categoryId"
      }
    }

    return products;
    } catch (error) {
      throw error;
    }
  }

  // export
  module.exports = {
    getProductById,
    getAllProducts,
    createProduct,
    updateProduct,
    destroyProduct,
    getProductsByCategory
  }