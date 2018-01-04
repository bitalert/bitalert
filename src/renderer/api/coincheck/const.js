exports.BASE_URL = 'https://coincheck.com/api/'
exports.ORDER_TYPE = {
  'buy': 'buy', // 指値注文 現物取引 買い
  'sell': 'sell', // 指値注文 現物取引 売り
  'market_buy': 'market_buy', // 成行注文 現物取引 買い
  'market_sell': 'market_sell', // 成行注文 現物取引 売り
  'leverage_buy': 'leverage_buy', // 指値注文 レバレッジ取引新規 買い
  'leverage_sell': 'leverage_sell', // 指値注文 レバレッジ取引新規 売り
  'close_long': 'close_long', // 指値注文 レバレッジ取引決済 売り
  'close_short': 'close_short' // 指値注文 レバレッジ取引決済 買い
}