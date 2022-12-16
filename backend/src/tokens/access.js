
const jwt = require('jsonwebtoken')
const user = require('../database/users/queries')

const KEY = process.env.ACCESS_TOKEN_ENCODE
const EXPIRES = 60 * 60


async function encode(username) {
  return jwt.sign({
    date: new Date().getTime(),
    uuid: await user.getUuid(username)
  }, KEY)
}
function decode(token) {

  let obj = jwt.decode(token, KEY)

  if (new Date().getTime() > obj.date + 5) {
    return false
  }

  return obj.uuid
}


module.exports = {
  encode, decode
}

