
const db = require('./queries')
const Handle = require('./../handle').Handle

class Battle extends Handle {

  constructor(battlename) {
    super(
      async () => {
        return await db.getBattle(this.battlename)
      } 
    )
    this.battlename = battlename
  }

  async instantiate(x, y) {
    await db.createBattle(this.battlename, x, y)
  }

  get tags() {
    return new Promise((resolve, reject) => {
      db.getTags(this.battlename).then((t) => {
        if (t) {
          let tags = new Array(t.length)
          for (let i = 0; i < t.length; i++) {
            tags[i] = t[i].tag
          }
          resolve(tags)
        } else {
          resolve(null)
        }
      }) 
    })
  }
  get description() {
    return new Promise((resolve, reject) => {
      db.getDesciption(this.battlename).then(d => {
        if (d) {
          resolve(d.description)
        } else {
          resolve(null)
        }
      })
    })
  }
  
  get date() {
    return new Promise((resolve, reject) => {
      db.getBattle(this.battlename).then(d => {
        resolve(d.date.getFullYear())
      })
    })
  }
  get winningFaction() {
    return new Promise((resolve, reject) => {
      db.getBattle(this.battlename).then(d => {
        resolve(d.winning_faction)
      })
    })
  }
  get winningCommander() {
    return new Promise((resolve, reject) => {
      db.getBattle(this.battlename).then(d => {
        resolve(d.winning_commander)
      })
    })
  }
  get winningDeaths() {
    return new Promise((resolve, reject) => {
      db.getBattle(this.battlename).then(d => {
        resolve(d.winning_deaths)
      })
    })
  }
  get losingFaction() {
    return new Promise((resolve, reject) => {
      db.getBattle(this.battlename).then(d => {
        resolve(d.losing_faction)
      })
    })
  }
  get losingCommander() {
    return new Promise((resolve, reject) => {
      db.getBattle(this.battlename).then(d => {
        resolve(d.losing_commander)
      })
    })
  }
  get losingDeaths() {
    return new Promise((resolve, reject) => {
      db.getBattle(this.battlename).then(d => {
        resolve(d.losing_deaths)
      })
    })
  }

  get location() {
    return new Promise((resolve, reject) => {
      db.getBattle(this.battlename).then(d => {
        let x = d.location_x
        let y = d.location_y
        if (x === null || y === null) {
          resolve(null)
        }
        else {
          resolve({x, y})
        }
      })
    })
  }


  async addTag(tag) {
    db.addTag(this.battlename, tag)
  }
  async removeTag(tag) {
    db.removeTag(this.battlename, tag)
  }

  set description(description) {
    db.updateDescription(this.battlename, description)
  }
  
  set date(date) {
    db.updateBattle(this.battlename, {
      date: new Date(date, 0, 1)
    })
  }
  set winningFaction(faction) {
    db.updateBattle(this.battlename, {
      winningFaction: faction
    })
  }
  set winningCommander(commander) {
    db.updateBattle(this.battlename, {
      winningCommander: commander
    })
  }
  set winningDeaths(deaths) {
    db.updateBattle(this.battlename, {
      winningDeaths: deaths
    })
  }
  set losingFaction(faction) {
    db.updateBattle(this.battlename, {
      losingFaction: faction
    })
  }
  set losingCommander(commander) {
    db.updateBattle(this.battlename, {
      losingCommander: commander
    })
  }
  set losingDeaths(deaths) {
    db.updateBattle(this.battlename, {
      losingDeaths: deaths
    })
  }

  async setLocation(x, y) {
    db.updateBattle(this.battlename, {
      locationX: x,
      locationY: y,
    })
  }

}

module.exports = { Battle }


