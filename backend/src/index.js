
const PORT = process.env.PORT || 8080

const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config();


const express = require('express')
const router = express.Router()

const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())


const user = require('./database/users/user')
const User = user.User

const battle = require('./database/battles/battle')
const Battle = battle.Battle




app.post("/api/token", async (req, res) => {
  
  let key = process.env.JWT_SECRET_KEY;
  key = "12345"
  let data = {
    user: "Plegeus"
  }

  const token = jwt.sign(data, key);
  console.log(jwt.decode(token))

  res.send(token);

  console.log("TOKEN")
  console.log(token)

})

app.get("/api/foo", (req, res) => {
  console.log("get @ foo!")
})

app.get("/api/validate_token", (req, res) => {

  console.log("GET")

  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
      const token = req.header(tokenHeaderKey);

      const verified = jwt.verify(token, jwtSecretKey);
      if(verified){
          return res.send("Successfully Verified");
      }else{
          // Access Denied
          return res.status(401).send(error);
      }
  } catch (error) {
      // Access Denied
      return res.status(401).send(error);
  }
});


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


