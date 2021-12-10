const bcrypt = require("bcrypt");
const SALT_COUNT = 13;

const rebuildDB = require("../db/init_db");
// const { client } = require("../db");

const { Client } = require("pg");

const DB_NAME = "capstone-dev";
const DB_URL = `postgres://localhost:5432/${DB_NAME}`;

const client = new Client(DB_URL);

// USERS FUNCTIONS TO TEST
const {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
  deactivateUser,
} = require("../db");

jest.setTimeout(10000);

describe("Database", () => {
  beforeAll(async () => {
    await rebuildDB();
    await client.end();
  });
  // afterEach(async () => {
  //   await client.end();
  // });
  describe("Users", () => {
    test("it works", () => {
      expect(1).toEqual(1);
    });
    // let userToCreate, queriedUser;
    // let userInfo = {
    //   email: "example@example.com",
    //   name: "Test Jones",
    //   password: "test1234",
    // };
    // describe("createUser", () => {
    // beforeAll(async () => {
    //     userToCreate = await createUser(userInfo);
    //     const {
    //       rows: [testUser],
    //     } = await client.query(
    //       `
    //                 SELECT * FROM users
    //                 WHERE email=$1;
    //             `,
    //       [userInfo.email]
    //     );
    //     queriedUser = testUser;
    //   });
    // test("Creates the user", async () => {
    //   expect(userToCreate.email).toBe(userInfo.email);
    //   expect(queriedUser.email).toBe(userInfo.email);
    // });
  });
});
