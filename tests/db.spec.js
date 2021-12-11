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
const { user } = require("pg/lib/defaults");

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
        testUser.active ? delete testUser.active : null;
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
});
