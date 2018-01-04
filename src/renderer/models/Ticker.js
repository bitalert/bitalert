export default class 
{
  constructor () {
    this.timer = null
    this.failCount = 10
  }

  start (interval) {
    if (this.timer) 
    {
      clearInterval(this.timer)
    }
    this.failCount = 0
    this.timer = setInterval(interval, 1000)
  }

  stop () {
    if (this.timer)
    {
      clearInterval(this.timer)
    }
  }

  setAlert (alert) {
    
  }

  checkTicker (ticks) {

  }
}