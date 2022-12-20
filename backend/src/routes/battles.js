
const express = require('express')
const router = express.Router()

const battle = require('../database/battles/queries')


router.use((req, res, next) => {
  console.log('received request @ battle')
  next()
  console.log('')
})

router.get('/filter', async (req, res) => {

  console.log('received post request @ filter')

  let b = await battle.filter(req.body)
  //console.log(b)

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

  let d = await battle.getDesciption(b.battlename)
  if (d) {
    b.description = d.description
  } else {
    b.description = null
  }

  res.json(b)

})


module.exports = router


