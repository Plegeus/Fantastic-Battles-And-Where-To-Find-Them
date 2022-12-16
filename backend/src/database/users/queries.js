
const database = require('./../database')
const connection = database.makeConnection("fbwftUsers")

const uuid = require('uuid')


async function getUserByMail(mailaddress) {
  
  let q = await connection.query(
    "SELECT * FROM users WHERE email = ?", [mailaddress]
  )

  if (q.length === 0) {
    return false
  }

  return q[0].username
}
async function getPassword(username) {

  let q = await connection.query(
    "SELECT * FROM passwords WHERE username = ?", [username]
  )
  
  if (q.length === 0) {
    return false
  }

  return q[0].password
}

async function updateUser(username, email) {
  await connection.query(
    "UPDATE users SET email = ? WHERE username = ?", [email, username] 
  )
}
async function updatePassword(username, password=null) {
  await connection.query(
    "UPDATE passwords SET password = ? WHERE username = ?", [password, username]
  )
}

async function createUser(username, email, password) {
  await connection.query(
    "INSERT INTO users (username, email, uuid) VALUES(?, ?, ?)", [username, email, uuid.v4()]
  )
  await connection.query(
    "INSERT INTO passwords (username, password) VALUES(?, ?)", [username, password]
  )
}

async function getUuid(username) {

  let q = await connection.query(
    "SELECT uuid FROM users WHERE username = ?", [username]
  )

  return q[0].uuid
}

async function userExists(username) {

  let q = await connection.query(
    "SELECT * FROM users WHERE username = ?", [username]
  )

  if (q.length === 0) {
    return false
  }

  return q[0]
}


module.exports = {
  getUserByMail,
  getPassword,
  updateUser,
  updatePassword,
  createUser,
  userExists,
  getUuid
}
