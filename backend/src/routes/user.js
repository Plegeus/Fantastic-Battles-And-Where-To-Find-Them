
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
      let refr = `${await refresh.encode(username)}`
      res.cookie("refresh", refr, {
        sameSite: 'strict',
        //secure: true,
        //httpOnly: true
      })
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
  res.clearCookie("refresh")
  res.status(200).send()
})

router.post('/register', async (req, res) => {

  console.log('received post request @ register')

  let mailaddress = req.body.mailaddress
  let username = req.body.username
  let password = req.body.password

  if (!await user.userExists(username)) {

    user.createUser(username, mailaddress, password)
    
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

  res.json((await user.allUsers()).map(
    u => u.username
  ))

})

router.get('/:username', async (req, res) => {

  console.log('received get request @ username')

  let username = req.params.username

  let u = await user.getUser(username)

  // this information may not be made public...
  u.uuid = undefined
  u.email = undefined

  res.json(u)

})


module.exports = router


