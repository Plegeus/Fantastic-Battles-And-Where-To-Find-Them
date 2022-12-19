
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

  console.log(await battle.filter(req.body))

})
router.get('/name/:name', async (req, res) => {

  console.log('received post request @ name')

  let name = req.params.name

  let b = await battle.getBattle(name)
  b.description = (await battle.getDesciption(name)).description

  res.json(b)

})


module.exports = router


