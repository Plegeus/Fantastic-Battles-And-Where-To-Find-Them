
const db = require('./queries')
const Handle = require('./../handle').Handle

class User extends Handle {

  constructor(username) {
    super(
      async () => {
        return await db.getUser(this.username)
      }
    )
    this.username = username
  }

  async instantiate(email, password) {
    await db.createUser(this.username, email, password)
  }

  get password() {
    return db.getPassword(this.username)
  }
  get email() {
    return new Promise((resolve, reject) => {
      db.getUser(this.username).then(dat => {
        resolve(dat.email)
      })
    })
  }

  set password(password) {
    db.updatePassword(this.username, password)
  }
  set email(email) {
    db.updateUser(this.username, email)
  }

}

module.exports = { User }


