
class Handle {

  constructor(get) {
    this.get = get
  }

  async exists() {
    let u = await this.get()
    if (u) {
      return true
    }
    return false
  }

}

module.exports = { Handle }

