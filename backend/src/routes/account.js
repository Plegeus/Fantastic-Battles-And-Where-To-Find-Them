
const express = require('express')
const router = express.Router()

const user = require('../database/users/queries')

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
    if (u) {
      // a user was found with this uuid, we may continue,
      // the uuid (decode) is provide to the following routes to avoid
      // decoding twice...
      req.body.uuid = decode
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

router.post('/edit/:username', async (req, res) => {
  
  console.log('received post request @ edit')

  let uuid = req.body.uuid
  if (req.params.username === await user.getByUuid(uuid)) {
    await user.updateUser(req.params.username, req.body)
    res.status(200)
    return
  }

  console.log(' > the username and uuid to not correspond')

  res.status(401).send('invalid username for provided token...')  

})


module.exports = router

