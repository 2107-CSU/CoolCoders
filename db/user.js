const bcrypt = require("bcrypt");
const { rows } = require("pg/lib/defaults");
const client = require("./client");

async function createUser({ email, name, password, userStatus = "user" }) {
  try {
    const SALT_COUNT = 13;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(email, name, password, "userStatus")
            VALUES($1, $2, $3, $4)
            ON CONFLICT (email) DO NOTHING
            RETURNING *;
        `,
      [email, name, hashedPassword, userStatus]
    );

    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ email, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE email=$1;
        `,
      [email]
    );

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        delete user.password;
        return user;
      } /* else {
        throw new Error("Incorrect password.");
      } */ // replace with a return? Throwing error causes tests to fail unnecessarily
    }
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE id=$1;
        `,
      [userId]
    );
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE email=$1;
        `,
      [email]
    );
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function deactivateUser(userId) {
  try {
    await client.query(
      `
            UPDATE users
            SET active=false
            WHERE id=$1;
        `,
      [userId]
    );

    return true;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    // Refactored to not return password, as it's a security risk
    const { rows } = await client.query(`
      SELECT id, email, name, "userStatus"
      FROM users
      WHERE active=true;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateUser(userId, name) {
  try {
    await client.query(
      `
      UPDATE users
      SET name=$1
      WHERE id=$2
      RETURNING *;
    `,
      [name, userId]
    );

    return await getUserById(userId);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
  deactivateUser,
  getAllUsers,
  updateUser,
};
