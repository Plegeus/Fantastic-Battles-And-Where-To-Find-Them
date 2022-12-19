
const PORT = process.env.PORT || 8080

const express = require('express')
const app = express() 
app.use(require('body-parser').json())

const cookie = require('cookie-parser')
app.use(cookie())

const dotenv = require('dotenv')
dotenv.config()

const router = express.Router()

router.use((req, res, next) => {
  console.log("received request @ api")
  next()
})


router.use('/user', require('./routes/user'))
router.use('/battles', require('./routes/battles'))
router.use('/account/:username', require('./routes/account'))

app.use('/api', router)


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
  console.log('')
})


