
const sql = require("mysql2");
const users = require('./user.js');

const DATABASE = "fbwftUsers";

const pool = sql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}).promise();

async function query(q) {
  if (!q.endsWith(';')) {
    q = q + ';';
  }
  let result = await pool.query(q);
  return result[0];
}

// PREPARED STATEMENTS... PREVENT SQL INJECTIONS...
// SELECT * FROM users WHERE username=?, stuff like that...
async function getUser(username) {
  let result = await query("SELECT * FROM users WHERE username = '" + username + "'");
  if (result.length === 0) {
    return false;
  }
  return users.user(result[0].username);
}
async function putUser(user) {
  await query(
    "INSERT INTO users (username) VALUES('" + user.username + "')"
  );
  return true;
}

async function updatePassword(user, password) {

}
async function updateUser(user) {

}

async function getPassword(user) {
  let result = await query(
    "SELECT * FROM passwords WHERE username = '" + user.username + "'"
  );
  return result[0].password;
}

async function userExists(username) {
  if (await getUser(username)) {
    return true;
  }
  return false;
}




module.exports = {
  getUser,
  putUser,
  updateUser,
  updatePassword,
  getPassword
};



