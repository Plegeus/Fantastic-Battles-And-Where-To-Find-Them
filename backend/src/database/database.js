
const sql = require("mysql2");


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
      let result = await this.connection.execute(q, args)
      this.connection.unprepare(q)
      return result[0]
    },
  }
}


module.exports = {
  makeConnection
}



