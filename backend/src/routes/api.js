
const express = require('express')
const router = express.Router({ mergeParams: true })

/*
 * Each route exposed for the RESTfull api passes by /api...
 * we already provide a middleware functino, 
 * in the future it is possible to easily add functionality
 * required by all api requests...
 */

router.use((req, res, next) => {
  console.log('received request @ api')
  next()
})

router.use('/user', require('./user'))
router.use('/battles', require('./battles'))

module.exports = router

