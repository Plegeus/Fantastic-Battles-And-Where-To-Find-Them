
const PORT = process.env.PORT || 8080

const express = require('express')
const router = express.Router()

const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())


const user = require('./database/users/user')
const User = user.User

const battle = require('./database/battles/battle')
const Battle = battle.Battle




app.post("/api/login", async (req, res) => {
  let login = req.body
  let user = new User(login.username)
  if (await user.exists() && await user.password === login.password) {
    res.json(JSON.stringify({succes: true}))
  }
  else {
    res.json(JSON.stringify({succes: false}))
  }
})



app.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`)
  let b = new Battle('Battle of Dunkirk')
  let c = new Battle('Battle of Pancakes')
  c.description = "Lots of pancakes"
  await c.setLocation(30.9, 41.2)
  console.log(await b.date)
  b.date = 1000
})


