exports.BASE_URL = 'https://api.bitflyer.jp/'

exports.HEALTH = {
  'NORMAL': '取引所は稼動しています。',
  'BUSY': '取引所に負荷がかかっている状態です。',
  'VERY BUSY': '取引所の負荷が大きい状態です。',
  'SUPER BUSY': '負荷が非常に大きい状態です。発注は失敗するか、遅れて処理される可能性があります。',
  'NO ORDER': '発注が受付できない状態です。',
  'STOP': '取引所は停止しています。発注は受付されません。'
}

exports.STATE = {
  'RUNNING': '通常稼働中',
  'CLOSED': '取引停止中',
  'STARTING': '再起動中',
  'PREOPEN': '板寄せ中',
  'CIRCUIT BREAK': 'サーキットブレイク発動中',
  'AWAITING SQ': 'Lightning Futures の取引終了後 SQ（清算値）の確定前',
  'MATURED': 'Lightning Futures の満期に到達'
}
