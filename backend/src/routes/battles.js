
const express = require('express')
const router = express.Router()

const battle = require('../database/battles/queries')


router.use((req, res, next) => {
  console.log('received request @ battle')
  next()
})

router.get('/count/:start/:count', async (req, res) => {
  
  console.log('received get request @ count')

  let start = req.params.start
  let count = req.params.count

  res.status(200).json(await battle.getById(start, count))

})

module.exports = router


