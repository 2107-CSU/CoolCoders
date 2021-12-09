/* 
id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                name VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                active BOOLEAN DEFAULT true,
                "userStatus" user_type NOT NULL
*/
const client = require("./client");

async function createUser({ email, name, password, userStatus = "user" }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(email, name, password, "userStatus")
            VALUES($1, $2, $3, $4)
            ON CONFLICT (email) DO NOTHING
            RETURNING *;
        `,
      [email, name, password, userStatus]
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
      rows: [validUser],
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE email=$1;
        `,
      [email]
    );

    if (validUser.password === password) {
      delete validUser.password;
      return validUser;
    } else {
      throw new Error("Incorrect password.");
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

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
  deactivateUser,
};
