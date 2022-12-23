
const PORT = process.env.PORT || 8080

/*
 * This file is the workhorse of the backend. 
 * The main responsibility of the backend is to listen for requests and respond to said
 * reauests. Ofcourse we also need to do some vaildation, for which middleware functions 
 * in the router are very useful.
 * 
 * Note that each route has a console log which will display the routes name whenever
 * it is fetched, this is for debugging purposes and could be abstracted behind a self made 
 * javascript class in order to automate this...
 * 
 */

// imports...
const express = require('express')
const app = express() 
app.use(require('body-parser').json())

const cookie = require('cookie-parser')
app.use(cookie())

const dotenv = require('dotenv')
dotenv.config()

const acces = require('./tokens/access')
const refresh = require('./tokens/refresh')

const user = require('./database/users/queries')

// top level routes...
const router = express.Router()

router.use('/api', require('./routes/api'))
router.use('/account/:username', require('./routes/account'))

app.use('/', router)

app.get('/refresh', async (req, res) => {

  console.log('received get request @ refresh')

  let cookies = req.cookies
  console.log(` > cookies: ${JSON.stringify(cookies)}`)

  // verify if there is a refresh cookie... 
  let refr = cookies.refresh
  if (!refr) {
    res.status(401).send("no refresh token provided")
    console.log(" > no token")
    return
  }

  // decode cookie...
  let decode = refresh.decode(refr)
  if (decode) {
    let u = await user.getByUuid(decode) // check if a user exists with this decode...
    if (u) {
      console.log(" > new token made")
      // send new access token...
      res.status(200).json({
        token: await acces.encode(u.username),
        username: u.username,
      })
      return
    }
  } 

  // the has expired, the user must login again...
  console.log(" > refresh expired")
  res.status(401).send("refreshtoken expired")

})



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
  console.log('')
})


