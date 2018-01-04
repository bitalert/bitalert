export default {
  enable: function () {
    return new Promise((resolve, reject) => {
      if (window.Notification) {
        if (window.Notification.permission === 'granted') {
          return resolve()
        } else {
          // 許可が取れていない場合はNotificationの許可を取る
          window.Notification.requestPermission((result) => {
            if (result === 'denied') {
              return reject(new Error('通知許可されませんでした'))
            } else if (result === 'default') {
              alert('通知可能か不明です')
              return resolve()
            } else if (result === 'granted') {
              return resolve()
            }
          })
        }
      } else {
        return reject(new Error('Notificationは無効です'))
      }
    })
  },
  notify: function (msg) {
    console.log('notify ' + msg)
    this.enable()
      .then(() => {
        return new window.Notification(msg)
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
