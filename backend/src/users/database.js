
const sql = require("mysql2");

const DATABASE = "users_info";

const pool = sql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

function exists(user) {
  let vals = null;
  pool.query(
    "SELECT * FROM users WHERE username = '" + user + "'", 
    (error, rows, fields) => {
      vals = rows;
    }
  )
  return vals;
}



console.log(exists('Plegeus'));




//module.exports = {
//  foo
//};



