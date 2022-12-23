
const express = require('express')
const router = express.Router({ mergeParams: true })
const battleRouter = express.Router({ mergeParams: true })

const user = require('../database/users/queries')
const battle = require('../database/battles/queries')

const acces = require('../tokens/access')

/*
 * The account route handles all functionality for which a user
 * must be logged in.
 * 
 * The middleware function will attemt to decode an access token where,
 * upon success, the router continues to the next route... 
 *
 */


router.use(async (req, res, next) => {

  console.log('received request @ account')

  // retrieve the token and check if it exists...
  let token = req.headers.authorization
  if (!token) {
    res.status(401).send("Expected bearer token!")
    console.log(' > no token provided')
    return
  }

  token = token.replace('Bearer ', '')

  // decode should return a valid uuid...
  let decode = acces.decode(token)
  if (decode) {
    // check if there is a user with this uuid...
    let u = await user.getByUuid(decode)
    if (u && u.username === req.params.username) {
      // a user was found with this uuid, we may continue,
      // the uuid (decode) is provide to the following routes to avoid
      // decoding twice...
      req.body.user = u
      console.log(' > token decoded succesfully')
      next()
      return
    }
    // no user was found with this uuid, are we under attack...?
    console.log(' > UNDER ATTACK')
    res.status(500).send("UNDER ATTACK!")
    return
  }

  // the token was expired, it should be refreshed...
  console.log(' > token expired')
  res.status(401).send("Token expired...")

  console.log('')

})

// edit a users profile...
router.put('/edit', async (req, res) => {
  console.log('received put request @ edit')
  user.updateUser(req.body.user.username, req.body)
  res.status(200)
})

// an additional route for editing battles...
router.use('/battle', battleRouter)

battleRouter.use((req, res, next) => {
  console.log('received request @ battle')
  next()
})

// edit a battle's information...
battleRouter.put('/:battlename/edit', async (req, res) => {

  console.log('received put request @ edit')

  let body = req.body
  body.rating = undefined

  let username = req.params.username
  let battlename = req.params.battlename

  let b = await battle.getBattle(battlename)

  let editingUser = await user.getUser(username)
  let originalUser = b ? await user.getUser(b.username) : editingUser

  // verify if the editing user is allowed to edit this post...
  // note that if a user wants to edit his own post, the rating of the
  // post's owner and the editing user will be the same, hence 
  // it is crucial to provide a lesser equal operation rather than a lesser...

  if (originalUser.rating <= editingUser.rating) {
    await battle.updateBattle(battlename, body)
    await user.updateBattle(battlename, body.battlename)
  }

  res.status(200).send()

})
battleRouter.post('/:battlename/add', async (req, res) => {

  console.log('received post request @ add')

  let body = req.body
  body.rating = undefined

  let username = req.params.username
  let battlename = req.params.battlename

  console.log(username)
  console.log(battlename)

  // check if the battle exists...
  if (await battle.getBattle(battlename)) {
    res.status(401).send("battle already exists")
    return
  }

  // create a battle and update the battle with the provided information...
  await battle.createBattle(battlename, username, body.location_x, body.location_y)
  await battle.updateBattle(battlename, body)

  res.status(200).send()

})

// a user may 'like' a battle... 
battleRouter.post('/:battlename/like', async (req, res) => {

  console.log('received post request @ like')

  // get the user who is like the battle as well as the battle being liked...
  let username = req.params.username
  let battlename = req.params.battlename

  let b = await battle.getBattle(battlename)
  let u = await user.getUser(b.username) // the user who made this battle...

  // check if the user liked the battle and update the ratings accordingly
  if (!await user.likedBattle(username, battlename)) {
    user.likeThisBattle(username, battlename)
    battle.updateBattle(battlename, {
      rating: b.rating + 1
    })
    user.updateUser(u.username, {
      rating: u.rating + 1
    })
  }

  res.status(200).send()

})
// a user may unlike a battle...
battleRouter.post('/:battlename/unlike', async (req, res) => {

  console.log('received post request @ unlike')

  let username = req.params.username
  let battlename = req.params.battlename

  let b = await battle.getBattle(battlename)
  let u = await user.getUser(b.username)

  // the same as liking, but now undoing the like...
  if (await user.likedBattle(username, battlename)) {
    user.unlikeThisBattle(username, battlename)
    battle.updateBattle(battlename, {
      rating: b.rating - 1
    })
    user.updateUser(u.username, {
      rating: u.rating - 1
    })
  }

  res.status(200).send()

})


module.exports = router

