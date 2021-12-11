const bcrypt = require("bcrypt");
const SALT_COUNT = 13;

const rebuildDB = require("../db/init_db");
const { client } = require("../db");
const { mockUsers } = require("../db/mockData");

/* const { Client } = require("pg");

const DB_NAME = "capstone-dev";
const DB_URL = `postgres://localhost:5432/${DB_NAME}`;

const client = new Client(DB_URL); */

// USERS FUNCTIONS TO TEST
const {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
  deactivateUser,
  getAllUsers,
  updateUser,
} = require("../db");

// PRODUCTS FUNCTIONS TO TEST
const {
  getProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  destroyProduct,
  getProductsByCategory,
} = require("../db");

// ORDERS FUNCTIONS TO TEST
const {
  getAllOrders,
  getOrderByProductId,
  getOrderByUsername,
  createOrder,
} = require("../db");

jest.setTimeout(10000);

describe("Database", () => {
  beforeAll(() => {
    return rebuildDB();
  });
  afterAll(() => {
    return client.end();
  });
  describe("Users", () => {
    let userToCreate, queriedUser;
    let userCredentials = {
      email: "example@example.com",
      name: "Test Jones",
      password: "test1234",
    };
    describe("createUser", () => {
      beforeAll(async () => {
        userToCreate = await createUser(userCredentials);
        const {
          rows: [testUser],
        } = await client.query(
          `
          SELECT * FROM users WHERE email=$1;
        `,
          [userToCreate.email]
        );
        queriedUser = testUser;
      });
      it("Creates the user", async () => {
        expect(userToCreate.email).toBe(userCredentials.email);
        expect(queriedUser.email).toBe(userCredentials.email);
      });
      it("Does not store plaintext password", async () => {
        expect(queriedUser.password).not.toBe(userCredentials.password);
      });
      it("Hashes the password before storing it", async () => {
        const hashedPwd = bcrypt.compareSync(
          userCredentials.password,
          queriedUser.password
        );
        expect(hashedPwd).toBe(true);
      });
      it("Does NOT return the password", async () => {
        expect(userToCreate.password).toBeFalsy();
      });
    });
    describe("getUser", () => {
      let verifiedUser;
      beforeAll(async () => {
        verifiedUser = await getUser(userCredentials);
      });
      it("Verifies plaintext password against hashed password in database", async () => {
        const unVerifiedUser = await getUser({
          email: userCredentials.email,
          password: "badPassword",
        });
        expect(verifiedUser).toBeTruthy();
        expect(verifiedUser.email).toBe(userCredentials.email);
        expect(unVerifiedUser).toBeFalsy();
      });
      it("Does NOT return the password", async () => {
        expect(verifiedUser.password).toBeFalsy();
      });
    });
    describe("getUserById", () => {
      it("Gets a user based on user ID and does NOT return password", async () => {
        const user = await getUserById(userToCreate.id);
        expect(user).toBeTruthy();
        expect(user.id).toBe(userToCreate.id);
        expect(user.password).toBeFalsy();
      });
    });
    describe("getUserByEmail", () => {
      it("Gets a user based on email and does NOT return password", async () => {
        const user = await getUserByEmail(userCredentials.email);
        expect(user).toBeTruthy();
        expect(user.email).toBe(userCredentials.email);
        expect(user.password).toBeFalsy();
      });
    });
    describe("deactivateUser", () => {
      it("Successfully deactivates a user", async () => {
        const deactivatedUser = await deactivateUser(userToCreate.id);
        expect(deactivatedUser).toBeTruthy();
        const user = await getUserById(userToCreate.id);
        expect(user.active).toBeFalsy();
      });
    });
    describe("getAllUsers", () => {
      it("Fetches an array of all active users", async () => {
        const users = await getAllUsers();
        const testUser = await getUserById(1);
        testUser.active ? delete testUser.active : null; // fetched users are supposed to be active
        expect(users).toContainEqual(testUser);
      });
    });
    describe("updateUser", () => {
      it("Successfully updates a user's information", async () => {
        const userToUpdate = await getUserByEmail(userCredentials.email);
        const updatedUser = await updateUser(userToUpdate.id, "Test Robinson");
        expect(updatedUser).not.toEqual(userToUpdate);
      });
    });
  });
  describe("Products", () => {
    let productToCreate, queriedProduct;
    let productInfo = {
      title: "Test product",
      description: "This product is for testing.",
      price: 100,
      quantity: 100,
      categoryId: 1,
      photo: "Placeholder URL",
    };
    describe("createProduct", () => {
      beforeAll(async () => {
        productToCreate = await createProduct(productInfo);
        const {
          rows: [testProduct],
        } = await client.query(
          `
          SELECT * FROM products
          WHERE title=$1;
        `,
          [productInfo.title]
        );
        queriedProduct = testProduct;
      });
      it("Creates a new product in the database", async () => {
        expect(productToCreate.title).toBe(productInfo.title);
        expect(queriedProduct.title).toBe(productInfo.title);
      });
    });
    describe("getProductById", () => {
      it("Fetches a product by its passed-in ID", async () => {
        let id = queriedProduct.id;
        const product = await getProductById(id);
        expect(product).toEqual(queriedProduct);
      });
    });
    describe("getAllProducts", () => {
      it("Retrieves all existing products from the database", async () => {
        let products = await getAllProducts();
        let sampleProduct = await getProductById(1);
        expect(products).toContainEqual(sampleProduct);
      });
    });
    describe("getProductsByCategory", () => {
      it("Retrieves products by category, according to passed-in category ID", async () => {
        let filteredProducts = await getProductsByCategory(1);
        expect(filteredProducts).toContainEqual(queriedProduct);
      });
    });
    describe("updateProduct", () => {
      it("Updates product information with passed-in fields", async () => {
        let id = queriedProduct.id;
        let fields = {
          title: "Updated Product Title",
          description: "Updated description.",
          price: 101,
        };
        const updatedProduct = await updateProduct(id, fields);
        console.log("Updated product:", updatedProduct);
        expect(updatedProduct).not.toEqual(queriedProduct);
      });
    });
    describe("destroyProduct", () => {
      it("Changes a product's active status to false, without deleting from DB", async () => {
        let id = queriedProduct.id;
        const deleteProduct = await destroyProduct(id);
        const product = await getProductById(id);
        expect(deleteProduct).toBeTruthy();
        expect(product.active).toBeFalsy();
      });
    });
  });
  describe("Orders", () => {});
});
