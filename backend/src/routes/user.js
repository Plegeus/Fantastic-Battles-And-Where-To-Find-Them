
const express = require('express')
const router = express.Router()

const user = require('../database/users/queries')

const acces = require('../tokens/access')
const refresh = require('../tokens/refresh')


router.use((req, res, next) => {
  console.log('received request @ user')
  next()
  console.log('')
})

router.post('/login', async (req, res) => {
  
  console.log('received post request @ login')

  let mailaddress = req.body.mailaddress
  let password = req.body.password

  let username = (await user.getUserByMail(mailaddress)).username

  if (username) {
    // acces token blah blah...
    if ((await user.getPassword(username)) === password) {
      let token = await acces.encode(username)
      res.cookie("refresh", await refresh.encode(username), {
        sameSite: 'strict',
        secure: true,
        httpOnly: true
      })
      res.status(200).json({
        token: token,
        username: username,
      })
      return
    }
  } 
  
  console.log(' > login failed')

  // user does not exist...
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

  console.log(' > register failed')

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

  console.log('received post request @ refresh')

  let cookies = req.cookies
  console.log(` > cookies: ${JSON.stringify(cookies)}`)

  console.log(cookies.refresh)
  

  // res.clearCookie() to delete cookies!

  //let r = req.authorization
  //if (!r) {
  //  res.status(401).send('Unauthorized...')
  //  console.log(' > no token provided')
  //  return
  //}

  //let decode = refresh.decode(r)
  //if (true) {
  //  let username = await user.getByUuid(decode)
  //  let token = acces.encode(username)
  //  res.cookie('refresh token', token, {

  //  })
  //  res.status(200).send("token refreshed")
  //  console.log(' > access token created')
  //  return
  //}

  //console.log(' > refresh token expired')

  //res.status(401).send('Refresh token expired, login required.')

})

router.get('/:username', async (req, res) => {

  console.log('received get request @ username')

  let username = req.params.username

  let u = await user.getUser(username)
  //u.battles = await user.getBattles(username)
  u.uuid = undefined

  res.json(u)

})

router.get('/:username/battles', async (req, res) => {

  console.log('received get request @ battles')

  let username = req.params.username
  res.json(await user.getBattles(username))

})

module.exports = router


