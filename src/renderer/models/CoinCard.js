export default class {
  constructor (source) {
    this.name = source.name
    this.url = source.url
    this.dispName = source.dispName
    this.image = source.image
    this.tick = null
    this.color = 'none' /* none, green, red */
    this.reset = false
  }

  resetTick () {
    this.reset = true
    this.tick = null
  }

  setTick (tick) {
    if (this.tick) {
      if (this.tick.mid > tick.mid) {
        this.color = 'red'
      } else if (this.tick.mid < tick.mid) {
        this.color = 'green'
      }
    }
    this.tick = tick
    this.reset = false
  }
}
