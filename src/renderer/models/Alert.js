export default class {
  constructor (source) {
    this.id = source.id
    this.name = source.name || ''
    this.coin = source.coin || 'none'
    this.action = source.action || 0
    this.object1 = source.object1 || 'none'
    this.object1Value = source.object1Value
    this.object2 = source.object2 || 'none'
    this.object2Value = source.object2Value
    this.enalbe = source.enable || false
    this.enalbeSound = source.enableSound || true
    this.enalbeNotification = source.enableNotification || true
    this.continuous = false
  }

  copy (alert) {
    this.id = alert.id
    this.name = alert.name || ''
    this.coin = alert.coin || 'none'
    this.action = alert.action || 0
    this.object1 = alert.object1 || 'none'
    this.object1Value = alert.object1Value
    this.object2 = alert.object2 || 'none'
    this.object2Value = alert.object2Value
    this.enalbe = alert.enable || false
    this.enalbeSound = alert.enableSound || false
    this.enalbeNotification = alert.enableNotification || false
    this.continuous = false
  }

  equals (alert) {
    return this.id === alert.id
  }

  setContinuous (bl) {
    this.continuous = bl
  }

  // check: チェックが通ったか, continuous: continuousの値
  checkAlert (ticks) {
    console.log('checkalert')
    let obj1, obj2
    if (!this.enalbe) return false

    if (this.object2 === 'numeric') {
      obj2 = this.object2Value
    }

    for (let i = 0; i < ticks.length; i++) {
      if (ticks[i].coin === this.coin && ticks[i].name === this.object1) {
        if (this.object1Value === 'bid') {
          obj1 = ticks[i].bid
        } else if (this.object1Value === 'ask') {
          obj1 = ticks[i].ask
        }
      }
      if (ticks[i].coin === this.coin && ticks[i].name === this.object2) {
        if (this.object2Value === 'bid') {
          obj2 = ticks[i].bid
        } else if (this.object2Value === 'ask') {
          obj2 = ticks[i].ask
        }
      }
    }

    if (obj1 && obj2) {
      if (this.action === 1 || this.action === '1') {
        return obj1 >= obj2
      } else if (this.action === 2 || this.action === '2') {
        return obj1 > obj2
      } else if (this.action === 3 || this.action === '3') {
        return obj1 <= obj2
      } else if (this.action === 4 || this.action === '4') {
        return obj1 < obj2
      } else {
        return false
      }
    } else {
      return false
    }
  }

  toString () {
    return this.name
  }
}
