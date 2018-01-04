export default class {
  constructor (source) {
    this.ask = source.ask
    this.bid = source.bid
    this.name = source.name // company name
    this.coin = source.coin // short coin name
    this.addtime = source.addtime
    this.mid = source.mid || (this.ask + this.bid / 2)
  }
}
