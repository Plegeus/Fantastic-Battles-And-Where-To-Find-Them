
const sql = require("mysql2");

// this file proved an abstraction over a connection to a database,
// the databse name can be provided to the function, the root password
// is stored in the .env file under the /src directory...

// we already provide a means for prepared statements in this file...

function makeConnection(database) {
  return {
    connection: sql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: process.env.SQL_ROOT_PASSWORD,
      database: database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    }).promise(),
    query: async function(q, args=[]) {
      if (!q.endsWith(';')) {
        q = q + ';'
      }
      let result = await this.connection.execute(q, args) // prepared statement...
      this.connection.unprepare(q)
      return result[0]
    },
  }
}


module.exports = {
  makeConnection
}



