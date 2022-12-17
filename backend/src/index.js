
const PORT = process.env.PORT || 8080

const express = require('express')
const app = express() 
app.use(require('body-parser').json())

const dotenv = require('dotenv')
dotenv.config()


app.use('/user', require('./routes/user'))
app.use('/battles', require('./routes/battles'))
app.use('/account', require('./routes/account'))



app.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`)
})


