
const express = require('express')
const router = express.Router()

const battle = require('../database/battles/queries')


router.use((req, res, next) => {
  console.log('received request @ battle')
  next()
  console.log('')
})

router.post('/filter', async (req, res) => {

  console.log('received post request @ filter')

  let b = await battle.filter(req.body)
  console.log(b)

  res.json(b)

})
router.get('/name/:name', async (req, res) => {

  console.log('received post request @ name')

  let name = req.params.name

  let b = await battle.getBattle(name)
  b.description = (await battle.getDesciption(name)).description

  res.json(b)

})
router.get('/id/:id', async (req, res) => {

  console.log('received post request @ id')

  let name = req.params.name

  let b = await battle.getBattleById(name)
  b.description = (await battle.getDesciption(name)).description

  res.json(b)

})


module.exports = router


