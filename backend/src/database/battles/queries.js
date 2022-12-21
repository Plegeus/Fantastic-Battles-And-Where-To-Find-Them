
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
async function getBattleById(id) {

  let q = await connection.query(
    "SELECT * FROM battles WHERE id = ?", [id]
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


async function updateBattle(battlename, values) {

  console.log(`battlename: ${battlename}`)
  //console.log(`${JSON.stringify(values)}`)

  if (values.date) {
    await connection.query(
      "UPDATE battles SET date = ? WHERE battlename = ?", [values.date, battlename]
    )
  }
  if (values.rating) {
    await connection.query(
      "UPDATE battles SET rating = ? WHERE battlename = ?", [values.rating, battlename]
    )
  }
  if (values.location_x) {
    await connection.query(
      "UPDATE battles SET location_x = ? WHERE battlename = ?", [values.location_x, battlename]
    )
  }
  if (values.location_y) {
    await connection.query(
      "UPDATE battles SET location_y = ? WHERE battlename = ?", [values.location_y, battlename]
    )
  }
  if (values.winning_faction) {
    await connection.query(
      "UPDATE battles SET winning_faction = ? WHERE battlename = ?", [values.winning_faction, battlename]
    )
  }
  if (values.losing_faction) {
    await connection.query(
      "UPDATE battles SET losing_faction = ? WHERE battlename = ?", [values.losing_faction, battlename]
    )
  }
  if (values.winning_commander) {
    await connection.query(
      "UPDATE battles SET winning_commander = ? WHERE battlename = ?", [values.winning_commander, battlename]
    )
  }
  if (values.losing_commander) {
    await connection.query(
      "UPDATE battles SET losing_commander = ? WHERE battlename = ?", [values.losing_commander, battlename]
    )
  }
  if (values.winning_deaths) {
    await connection.query(
      "UPDATE battles SET winning_deaths = ? WHERE battlename = ?", [values.winning_deaths, battlename]
    )
  }
  if (values.losing_deaths) {
    await connection.query(
      "UPDATE battles SET losing_deaths = ? WHERE battlename = ?", [values.losing_deaths, battlename]
    )
  }
  if (values.description) {
    await connection.query(
      "UPDATE descriptions SET description = ? WHERE battlename = ?", [values.description, battlename]
    )
  }
}

async function createBattle(battlename, username, locationX, locationY) {
  if (!await getBattle(battlename)) {
    await connection.query(
      "INSERT INTO battles (battlename, username, location_x, location_y) VALUES(?, ?, ?, ?)", [battlename, username, locationX, locationY]
    )
  }
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


async function filter(f) {

  // https://stackoverflow.com/questions/10829812/sql-query-where-value-of-another-table

  console.log(f)

  stat = "SELECT * FROM battles"
  props = []

  if (f.tags && f.tags.length > 0) {
    stat = stat + " INNER JOIN tags ON battles.battlename = tags.battlename WHERE (0 = 1"
    for (i = 0; i < f.tags.length; i++) {
      let t = f.tags[i]
      console.log("tag: " + t)
      stat = stat + " || tag = ?"
      props.push(t)
    }
    stat = stat + ")"
  } else {
    stat = stat + " WHERE 1 = 1"
  }

  if (f.date) {
    let date = f.date + "-12-31"
    stat = stat + " && date = ?"
    props.push(date)
  }
  if (f.deaths) {
    stat = stat + " && winning_deaths + losing_deaths >= ?"
    props.push(f.deaths)
  }
  if (f.username) {
    stat = stat + " && username = ?"
    props.push(f.username)
  }
  if (f.coords) {

    stat = stat + " && location_x >= ? && location_x <= ? && location_y <= ? && location_y >= ?"

    props.push(f.coords.x0)
    props.push(f.coords.x1)
    props.push(f.coords.y0)
    props.push(f.coords.y1)

  }

  let bs = await connection.query(stat, props)

  return bs
}


module.exports = {
  getBattle,
  getTags,
  createBattle,
  updateBattle,
  addTag,
  removeTag,
  createBattle,
  filter,
  getBattleById
}
