
const PORT = process.env.PORT || 8080

const express = require('express')
const app = express() 
app.use(require('body-parser').json())

const cookie = require('cookie-parser')
app.use(cookie())

const dotenv = require('dotenv')
dotenv.config()

const router = express.Router()

const acces = require('./tokens/access')
const refresh = require('./tokens/refresh')

const user = require('./database/users/queries')


router.use((req, res, next) => {
  console.log("received request @ api")
  next()
})

router.use('/user', require('./routes/user'))
router.use('/battles', require('./routes/battles'))
router.use('/account/:username', require('./routes/account'))

app.use('/api', router)

app.get('/refresh', async (req, res) => {

  console.log('received get request @ refresh')

  let cookies = req.cookies
  console.log(` > cookies: ${JSON.stringify(cookies)}`)

  let refr = cookies.refresh
  if (!refr) {
    res.status(401).send("no refresh token provided")
    console.log(" > no token")
    return
  }

  let decode = refresh.decode(refr)
  if (decode) {
    let u = await user.getByUuid(decode)
    if (u) {
      console.log(" > new token made")
      res.status(200).json({
        token: await acces.encode(u.username),
        username: u.username,
      })
      return
    }
  } 

  console.log(" > refresh expired")
  res.status(401).send("refreshtoken expired")

})



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
  console.log('')
})


