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
  beforeAll(() => {
    return rebuildDB().then(client.connect());
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
  });
});
