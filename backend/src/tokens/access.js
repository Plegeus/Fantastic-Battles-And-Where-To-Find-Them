
const jwt = require('jsonwebtoken')
const user = require('../database/users/queries')

const KEY = process.env.ACCESS_TOKEN_ENCODE
const EXPIRES = 60 * 60 * 1000


async function encode(username) {
  return jwt.sign({
    date: new Date().getTime(),
    uuid: (await user.getUser(username)).uuid,
  }, KEY)
}
function decode(token) {

  let obj = jwt.decode(token, KEY)

  if (new Date().getTime() > obj.date + EXPIRES) {
    return false
  }

  return obj.uuid
}


module.exports = {
  encode, decode
}

