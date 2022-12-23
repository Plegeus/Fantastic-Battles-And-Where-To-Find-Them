
const express = require('express')
const router = express.Router()

const battle = require('../database/battles/queries')
const user = require('../database/users/queries')

/*
 * Like with users, there is a route for battle data 
 * from which we can query data about the battles...
 */

router.use((req, res, next) => {
  console.log('received request @ battle')
  next()
  console.log('')
})

// the filter route will retrieve battles based on a filter,
// the username is provided for possibly future expansions on the filter
// as well as for the frontend to be able to perform some clever 'tricks'...
router.post('/filter/:username', async (req, res) => {

  console.log('received post request @ filter')
  console.log(" > filter: " + JSON.stringify(req.body))

  // retrieve a list of battles bsaed on a filter...
  let b = await battle.filter(req.body)
  res.json(b)

})

router.get('/id/:id', async (req, res) => {

  console.log('received get request @ id')

  let id = req.params.id

  // retrieve all the battle data from a battle based on its id 
  // in the database...
  let b = await battle.getBattleById(id)
  if (!b) {
    res.status(404).send(`no battle with id: ${id}`)
    return
  }

  //b.date = b.date.getFullYear()
  //console.log(b)

  res.json(b)

})

// query uf a user liked this battle...
router.get("/liked/:id/:username", async (req, res) => {

  console.log('received get request @ liked')

  let b = await battle.getBattleById(req.params.id)

  if (await user.likedBattle(req.params.username, b.battlename)) {
    console.log(" > likes")
    res.status(200).send()
  } else {
    console.log(" > not likes")
    res.status(400).send()
  }

})





module.exports = router


