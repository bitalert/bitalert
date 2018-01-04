import Alert from '../models/Alert'

let storage = {
  __createKey () {
    return 'alerts'
  },
  saveAlerts (alerts) {
    localStorage.setItem(storage.__createKey(), JSON.stringify(alerts))
  },
  loadAlerts () {
    let alerts = localStorage.getItem(storage.__createKey()) || '[]'
    alerts = JSON.parse(alerts)
    alerts = alerts.map((val, idx) => {
      return new Alert(val)
    }) || []
    return alerts.sort((a, b) => {
      return a.id > b.id
    })
  }
}
export default storage
