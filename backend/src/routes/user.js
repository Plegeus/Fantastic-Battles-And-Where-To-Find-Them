
const express = require('express')
const router = express.Router()

const user = require('../database/users/queries')


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
      //res.status(200).send("logged in!")
      res.end()
      return
    }
  } 
  
  res.end()
  // let frontend know this user does not exist...
  //res.status(401).send("incorrect username or password!")

})
router.post('/register', (req, res) => {

  console.log('received post request @ register')




})
router.post('/account', (req, res) => {
  console.log('received post request @ account')

})


module.exports = router


