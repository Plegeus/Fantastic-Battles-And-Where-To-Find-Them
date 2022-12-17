
const express = require('express')
const router = express.Router()

const user = require('../database/users/queries')

const acces = require('../tokens/access')
const refresh = require('../tokens/refresh')


router.use((req, res, next) => {
  console.log('received request @ user')
  next()
})

router.post('/login', async (req, res) => {
  
  console.log('received post request @ login')

  let mailaddress = req.body.mailaddress
  let password = req.body.password

  let username = await user.getUserByMail(mailaddress)

  if (await user.userExists(username)) {
    // acces token blah blah...
    if (await user.getPassword(username) === password) {
      let token = await acces.encode(username)
      let refresh = await refresh.encode(username)
      res.status(200).json({
        token: token,
        refresh: refresh,
        username: username,
      })
      return
    }
  } 
  
  // User does not exist...
  res.status(401).send("incorrect username or password!")

})
router.post('/register', async (req, res) => {

  console.log('received post request @ register')

  let mailaddress = req.body.mailaddress
  let username = req.body.username
  let password = req.body.password

  if (!await user.userExists(username)) {

    user.createUser(username, mailaddress, password)

    let token = await acces.encode(username)
    res.status(200).json(token)

    return
  }

  // user already exists...
  res.status(409).send('user already exists!')

})
router.get('/names', async (req, res) => {
  
  console.log('received get request @ names')

  res.json((await user.allUsers()).map(
    u => u.username
  ))

})

router.post('/refresh', async (req, res) => {

  let r = req.authorization
  if (!r) {
    res.status(401).send('Unauthorized...')
    return
  }

  let decode = refresh.decode(r)
  if (decode) {
    let username = await user.getByUuid(decode)
    let token = acces.encode(username)
    res.status(200).json(token)
    return
  }

  res.status(401).send('Refresh token expired, login required.')

})

module.exports = router


