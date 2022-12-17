
const jwt = require('jsonwebtoken')
const user = require('../database/users/queries')

const KEY = process.env.REFRESH_TOKEN_ENCODE
const EXPIRES = 24 * 60 * 60


async function encode(username) {
}
function decode(token) {
}


module.exports = {
  encode, decode
}