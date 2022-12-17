
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
    console.log(' > no token provided')
    return
  }

  let decode = acces.decode(token)
  if (decode) {
    let u = await user.getByUuid(decode)
    if (u) {
      console.log(' > token decoded succesfully')
      next()
    }
    console.log(' > UNDER ATTACK')
    res.status(500).send("UNDER ATTACK!")
  }

  console.log(' > token expired')
  res.status(401).send("Token expired...")

  console.log('')

})

router.post('/edit', async (req, res) => {
  
})


module.exports = router

