
const PORT = process.env.PORT || 8080

const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

const express = require('express')
const app = express() 
app.use(require('body-parser').json())

const user = require('./database/users/queries')


app.use('/user', require('./routes/user'))


app.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`)
})


