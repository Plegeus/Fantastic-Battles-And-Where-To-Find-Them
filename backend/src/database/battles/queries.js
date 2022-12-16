
const e = require('express')
const database = require('./../database')

const connection = database.makeConnection("fbwftBattles")


async function getBattle(battlename) {

  let q = await connection.query(
    "SELECT * FROM battles WHERE battlename = ?", [battlename]
  )

  if (q.length === 0) {
    return false
  }

  return q[0]
}
async function getTags(battlename) {
  
  let q = await connection.query(
    "SELECT * FROM tags WHERE battlename = ?", [battlename]
  )

  if (q.length === 0) {
    return null
  }

  return q
}
async function getDesciption(battlename) {

  let q = await connection.query(
    "SELECT * FROM descriptions WHERE battlename = ?", [battlename]
  )

  if (q.length === 0) {
    return null
  }
  if (q.length === 1) {
    return q[0]
  }

  throw new Error("A battle can only have one description!")
}

async function updateBattle(battlename, values) {
  if (values.date) {
    await connection.query(
      "UPDATE battles SET date = ? WHERE battlename = ?", [values.date, battlename]
    )
  }
  if (values.locationX) {
    await connection.query(
      "UPDATE battles SET location_x = ? WHERE battlename = ?", [values.locationX, battlename]
    )
  }
  if (values.locationY) {
    await connection.query(
      "UPDATE battles SET location_y = ? WHERE battlename = ?", [values.locationY, battlename]
    )
  }
  if (values.winningFaction) {
    await connection.query(
      "UPDATE battles SET winning_faction = ? WHERE battlename = ?", [values.winningFaction, battlename]
    )
  }
  if (values.losingFaction) {
    await connection.query(
      "UPDATE battles SET losing_faction = ? WHERE battlename = ?", [values.losingFaction, battlename]
    )
  }
  if (values.winningCommander) {
    await connection.query(
      "UPDATE battles SET winning_commander = ? WHERE battlename = ?", [values.winningCommander, battlename]
    )
  }
  if (values.losingCommander) {
    await connection.query(
      "UPDATE battles SET losing_commander = ? WHERE battlename = ?", [values.losingCommander, battlename]
    )
  }
  if (values.winningDeaths) {
    await connection.query(
      "UPDATE battles SET winning_deaths = ? WHERE battlename = ?", [values.winningDeaths, battlename]
    )
  }
  if (values.losingDeaths) {
    await connection.query(
      "UPDATE battles SET losing_deaths = ? WHERE battlename = ?", [values.losingDeaths, battlename]
    )
  }
}

async function createBattle(battlename, locationX, locationY) {
  await connection.query(
    "INSERT INTO battles (battlename, location_x, location_y) VALUES(?, ?, ?)", [battlename, locationX, locationY]
  )
}

async function addTag(battlename, tag) {
  let q = await connection.query(
    "SELECT tag FROM tags WHERE battlename = ? && tag = ?", [battlename, tag]
  )
  if (q.length === 0) {
    await connection.query(
      "INSERT INTO tags (battlename, tag) VALUES(?, ?)", [battlename, tag]
    )
  }
}
async function removeTag(battlename, tag) {
  await connection.query(
    "DELETE FROM tags WHERE battlename = ? && tag = ?", [battlename, tag]
  )
}

async function updateDescription(battlename, description) {
  if (await getDesciption(battlename)) {
    await connection.query(
      "UPDATE descriptions SET description = ? WHERE battlename = ?", [description, battlename]
    )
  } else {
    await connection.query(
      "INSERT INTO descriptions (battlename, description) VALUES(?, ?)", [battlename, description]
    )
  }
}

async function getById(start, count) {
  return await connection.query(
    "SELECT * FROM battles WHERE id >= ? && id < ?", [start, start + count]
  )
}


module.exports = {
  getBattle,
  getTags,
  getDesciption,
  createBattle,
  updateBattle,
  addTag, 
  removeTag,
  updateDescription,
  createBattle,
  getById
}
