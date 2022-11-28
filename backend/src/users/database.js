
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

async function getUser(name) {
  let result = await query("SELECT * FROM users WHERE username = '" + name + "'");
  if (result.length === 1) {
    let user = result[0];
    result = await query("SELECT * FROM passwords WHERE userid = '" + user.userid + "'");
    if (result.length === 1) {
      return users.user(user.userid, user.username, result[0].password);
    }
  }
  return false;
}
async function putUser(user) {

  // user already exists, return...
  if (getUser(user.username)) {
    return false;
  }

  // insert user into tables...
  await query(
    "INSERT INTO users (username) VALUES('" + user.username + "')"
  );
  let rget = getUser(user.username);
  if (rget) {
    rget.then((v) => {
      query(
        "INSERT INTO passwords (userid, password) VALUES(" + v.userid + ", " + user.password + ")"
      )
    })
  }

  return true;
}

module.exports = {
  getUser,
  putUser
};



