
const express = require('express')
const router = express.Router()

const battle = require('../database/battles/queries')
const user = require('../database/users/queries')


router.use((req, res, next) => {
  console.log('received request @ battle')
  next()
  console.log('')
})

router.post('/filter/:username', async (req, res) => {

  console.log('received post request @ filter')

  let b = await battle.filter(req.body)

  res.json(b)

})

router.get('/id/:id', async (req, res) => {

  console.log('received post request @ id')

  let id = req.params.id

  let b = await battle.getBattleById(id)
  if (!b) {
    res.status(404).send(`no battle with id: ${id}`)
    return
  }

  res.json(b)

})
router.get("/liked/:id/:username", async (req, res) => {

  let b = await battle.getBattleById(req.params.id)

  if (await user.likedBattle(req.params.username, b.battlename)) {
    res.status(200).semd()
  } else {
    res.status(400).send()
  }

})




module.exports = router


