
async function createUser({ email, name, password, userStatus }){
    try {
        const { rows: [user] } = await client.query(`
            INSERT INTO users(email, name, password, userStatus)
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `, [email, name, password, userStatus])

        delete user.password;

        return user;
    } catch (error) {
        throw error;
    }
}

async function getUser({ username, password }){
    try {
        const { rows: [validUser] } = await client.query(`
            SELECT *
            FROM users
            WHERE username=$1;
        `, [username]);

        if (validUser.password === password) {
            delete validUser.password;
            return validUser;
        } else {
            return false;
        }

    } catch (error) {
        throw error;
    }
}

async function getUserById(userId){
    try {
        const {rows: [user] } = await client.query(`
            SELECT *
            FROM users
            WHERE id=$1;
        `, [userId]);

        return user;
    } catch (error) {
        throw error;
    }
}

async function getUserByUsername(username){
    try {
        const {rows: [user] } = await client.query(`
            SELECT *
            FROM users
            WHERE username=$1;
        `, [username]);

        return user;
    } catch (error) {
        throw error;
    }
}

async function deactivateUser(userId){
    try {
        await client.query(`
            UPDATE users
            SET active=false
            WHERE id=$1;
        `, [userId])

        return true;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser, 
    getUser, 
    getUserById, 
    getUserByUsername, 
    deactivateUser,
}