
const express = require('express')
const router = express.Router()

const user = require('../database/users/queries')

const acces = require('../tokens/access')
const refresh = require('../tokens/refresh')

/*
 * This route corresponds to the main data of the user,
 * it is possible to view the users likes and some of its information. 
 */


router.use((req, res, next) => {
  console.log('received request @ user')
  next()
  console.log('')
})

// reauest to login the user...
router.post('/login', async (req, res) => {
  
  console.log('received post request @ login')

  // login information...
  let mailaddress = req.body.mailaddress
  let password = req.body.password

  let username = (await user.getUserByMail(mailaddress)).username

  if (username) {
    // acces token...
    if ((await user.getPassword(username)) === password) {
      let token = await acces.encode(username)
      let refr = `${await refresh.encode(username)}`
      // if the user logged in, a refresh token must be made...
      res.cookie("refresh", refr, {
        sameSite: 'strict',
        //secure: true,
        //httpOnly: true
      })
      // also an access token should be send back...
      res.status(200).json({
        token: token,
        username: username,
      })
      console.log(" > login succes")
      return
    }
  } 
  
  console.log(' > login failed')

  // user does not exist...
  res.status(401).send("incorrect username or password!")

})
router.post('/logout', (req, res) => {
  console.log("received post request @ logout")
  // loging a user out on the backend's side is as simpel as clearing the refresh token...
  res.clearCookie("refresh")
  res.status(200).send()
})

router.post('/register', async (req, res) => {

  console.log('received post request @ register')

  // information needed for registration...
  let mailaddress = req.body.mailaddress
  let username = req.body.username
  let password = req.body.password

  // check if such a user does not already exist,
  // for simplicity we left out a check on the email address...
  if (!await user.userExists(username)) {

    user.createUser(username, mailaddress, password)
  
    // like when logging in, the refresh and access token should be
    // created... 
    let refr = `${await refresh.encode(username)}`
    res.cookie("refresh", refr, {
      sameSite: 'strict',
      //secure: true,
      //httpOnly: true
    })
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

  // respond with a list of all users...
  res.json((await user.allUsers()).map(
    u => u.username
  ))

})

router.get('/:username', async (req, res) => {

  console.log('received get request @ username')

  // fetch all information on a user...
  let username = req.params.username
  let u = await user.getUser(username)

  // this information may not be made public...
  u.uuid = undefined
  u.email = undefined

  res.json(u)

})


module.exports = router


