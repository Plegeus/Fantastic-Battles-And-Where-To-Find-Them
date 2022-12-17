
const express = require('express')
const router = express.Router()

const user = require('../database/users/queries')

const acces = require('../tokens/access')
const refresh = require('../tokens/refresh')


router.use(async (req, res, next) => {

  console.log('received request @ account')

  let token = req.authorization

  if (!token) {
    res.status(401).send("Expected bearer token!")
    return
  }

  let decode = acces.decode(token)
  if (decode) {
    let u = await user.getByUuid(decode)
    if (u) {
      next()
    }
    res.status(500).send("UNDER ATTACK!")
  }
  res.status(401).send("Token expired...")
})

router.get('/user/:username', async (req, res) => {

  console.log('received get request @ user')

  let username = req.params.username

  let u = await user.getUser(username)
  u.battles = await user.getBattles(username)
  u.uuid = undefined

  res.json(u)

})


module.exports = router

