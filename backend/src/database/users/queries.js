
const database = require('./../database')
const connection = database.makeConnection("fbwftUsers")

const uuid = require('uuid')


async function allUsers() {
  return await connection.query(
    "SELECT * FROM users"
  )
}

async function getUser(username) {

  let q = await connection.query(
    "SELECT * FROM users WHERE username = ?", [username]
  )

  if (q.length === 1) {
    return q[0]
  }

  throw new Error("A username may only occur once!")
}
async function getUserByMail(mailaddress) {
  
  let q = await connection.query(
    "SELECT * FROM users WHERE email = ?", [mailaddress]
  )

  if (q.length === 1) {
    return q[0]
  }

  return false
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


async function createUser(username, email, password) {
  await connection.query(
    "INSERT INTO users (username, email, uuid) VALUES(?, ?, ?)", [username, email, uuid.v4()]
  )
  await connection.query(
    "INSERT INTO passwords (username, password) VALUES(?, ?)", [username, password]
  )
}

async function getByUuid(uuid) {

  let q = await connection.query(
    "SELECT * FROM users WHERE uuid = ?", [uuid]
  )

  if (q.length === 1) {
    return q[0]
  }
  if (q.length === 0) {
    return null
  }

  throw new Error("A username may only occur once!")
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

async function updateUser(username, values) {
  if (values.password) {
    await connection.query(
      "" 
    )
  }
  if (values.username) {
    await connection.query(
      "" 
    )
  }
  if (values.email) {
    await connection.query(
      "" 
    )
  }
  if (values.rating) {
    await connection.query(
      "" 
    )
  }
  if (values.bio) {
    await connection.query(
      "" 
    )
  }
}

async function addBattle(username, battlename) {
  await connection.query(
    "INSERT INTO battles (username, battlename) VALUES (?, ?)", [username, battlename]
  )
}
async function removeBattle(username, battlename) {
  await connection.query(
    "DELETE FROM battles WHERE username = ? && battlename = ?", [username, battlename]
  )
}
async function getBattles(username) {

  let q = await connection.query(
    "SELECT battlename FROM battles WHERE username = ?", [username]
  )
  
  return q.map(b => b.battlename)
}


module.exports = {
  getUserByMail,
  getPassword,
  createUser,
  userExists,
  getByUuid,
  allUsers,
  getUser,
  getBattles,
  removeBattle,
  updateUser,
  addBattle
}
