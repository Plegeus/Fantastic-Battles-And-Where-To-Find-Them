
const express = require('express')
const router = express.Router()

const user = require('../database/users/queries')

const acces = require('../tokens/access')


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
      res.status(200).json(token)
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
router.post('/account', (req, res) => {
  console.log('received post request @ account')

})


module.exports = router


