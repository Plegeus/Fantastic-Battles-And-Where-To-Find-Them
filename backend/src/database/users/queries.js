
const database = require('./../database')
const connection = database.makeConnection("fbwftUsers")

const uuid = require('uuid')


async function allUsers() {
  return await connection.query(
    "SELECT * FROM users"
  )
}

async function likedBattle(username, battlename) {

  let q = await connection.query(
    "SELECT * FROM likes WHERE username = ? && battlename = ?", [username, battlename]
  )

  return !(q.length === 0)
}
async function likeThisBattle(username, battlename) {
  await connection.query(
    "INSERT INTO likes (username, battlename) VALUES(? ,?)", [username, battlename]
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

async function updateBattle(battlename, newname) {
  await connection.query(
    "UPDATE likes SET battlename = ? WHERE battlename = ?", [newname, battlename]
  )
}

async function updateUser(username, values) {
  if (values.password) {
    await connection.query(
      "UPDATE passwords SET password = ? WHERE username = ?", [values.password, username] 
    )
  }
  if (values.email) {
    await connection.query(
      "UPDATE users SET email = ? WHERE username = ?", [values.email, username] 
    )
  }
  if (values.rating) {
    await connection.query(
      "UPDATE users SET rating = ? WHERE username = ?", [values.rating, username] 
    )
  }
  if (values.bio) {
    await connection.query(
      "UPDATE users SET bio = ? WHERE username = ?", [values.bio, username] 
    )
  }
  if (values.username) {
    await connection.query(
      "UPDATE users SET username = ? WHERE username = ?", [values.username, username]
    )
    await connection.query(
      "UPDATE passwords SET username = ? WHERE username = ?", [values.username, username]
    )
    await connection.query(
      "UPDATE likes SET username = ? WHERE username = ?", [values.username, username]
    )
  }
}


module.exports = {
  getUserByMail,
  getPassword,
  createUser,
  userExists,
  getByUuid,
  allUsers,
  getUser,
  updateUser,
  likedBattle,
  likeThisBattle,
  updateBattle
}
