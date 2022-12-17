
const express = require('express')
const router = express.Router()

const battle = require('../database/battles/queries')


router.use((req, res, next) => {
  console.log('received request @ battle')
  next()
  console.log('')
})

router.get('/count/:start/:count', async (req, res) => {
  
  console.log('received get request @ count')

  let start = req.params.start
  let count = req.params.count

  res.status(200).json(await battle.getById(start, count))

})
router.post('/filter', async (req, res) => {

  console.log('received post request @ filter')

  console.log(await battle.filter(req.body))

})
router.get('/name/:name', async (req, res) => {
  res.json(await battle.getBattle(req.params.name))
})

module.exports = router


