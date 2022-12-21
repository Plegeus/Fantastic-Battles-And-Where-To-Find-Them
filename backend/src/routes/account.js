
const express = require('express')
const router = express.Router({ mergeParams: true })

const user = require('../database/users/queries')
const battle = require('../database/battles/queries')

const acces = require('../tokens/access')
const refresh = require('../tokens/refresh')


router.use(async (req, res, next) => {

  console.log('received request @ account')

  // retrieve the token and check if it exists...
  let token = req.headers.authorization
  if (!token) {
    res.status(401).send("Expected bearer token!")
    console.log(' > no token provided')
    return
  }

  token = token.replace('Bearer ', '')

  // decode should return a valid uuid...
  let decode = acces.decode(token)
  if (decode) {
    // check if there is a user with this uuid...
    let u = await user.getByUuid(decode)
    if (u && u.username === req.params.username) {
      // a user was found with this uuid, we may continue,
      // the uuid (decode) is provide to the following routes to avoid
      // decoding twice...
      req.body.user = u
      console.log(' > token decoded succesfully')
      next()
      return
    }
    // no user was found with this uuid, are we under attack...?
    console.log(' > UNDER ATTACK')
    res.status(500).send("UNDER ATTACK!")
    return
  }

  // the token was expired, it should be refreshed...
  console.log(' > token expired')
  res.status(401).send("Token expired...")

  console.log('')

})

router.post('/edit', async (req, res) => {
  console.log('received post request @ edit')
  user.updateUser(req.body.user.username, req.body)
  res.status(200)
})

router.post('/battle/edit', async (req, res) => {

  console.log('received post request @ battle edit')
  console.log(req.body)

  let body = req.body
  body.rating = undefined

  let username = req.params.username
  let battlename = body.battlename

  console.log(`username: ${username}`)

  let b = await battle.getBattle(battlename)
  console.log(`battle: ${b}`)

  let editingUser = await user.getUser(username)
  let originalUser = b ? await user.getUser(b.username) : editingUser

  if (originalUser.rating <= editingUser.rating) {
    battle.createBattle(battlename, username, body.location_x, body.location_y)
    battle.updateBattle(battlename, body)
  }

  res.status(200).send()

})
router.post('/battle/like', async (req, res) => {

  console.log('received post request @ battle like')

  let username = req.params.username
  let battlename = req.body.battlename

  let b = await battle.getBattle(battlename)
  let u = await user.getUser(b.username)

  if (!await user.likedBattle(username, battle)) {
    user.likeThisBattle(username, battlename)
    battle.updateBattle(battlename, {
      rating: b.rating + 1
    })
    user.updateUser(u.username, {
      rating: u.rating + 1
    })
  }

  res.status(200).send()

})


module.exports = router

