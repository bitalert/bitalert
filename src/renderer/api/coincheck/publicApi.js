const axios = require('axios')
const BASE_URL = require('./const').BASE_URL

// ティッカー
// {
//   "last": 27390,
//   "bid": 26900,
//   "ask": 27390,
//   "high": 27659,
//   "low": 26400,
//   "volume": "50.29627103",
//   "timestamp": 1423377841
// }
exports.getTicker = () => {
  return axios.get(BASE_URL + 'tick')
}

// 全取引履歴
// {
//   "success": true,
//   "pagination": {
//     "limit": 1,
//     "order": "desc",
//     "starting_after": null,
//     "ending_before": null
//   },
//   "data": [
//     {
//       "id": 82,
//       "amount": "0.28391",
//       "rate": 35400,
//       "pair": "btc_jpy",
//       "order_type": "sell",
//       "created_at": "2015-01-10T05:55:38.000Z"
//     },
exports.getTrades = () => {
  return axios.get(BASE_URL + 'trades')
}

// 板情報
// {
//   "asks": [
//     [27330,"2.25"],
//     [27340,"0.45"]
//   ],
//   "bids": [
//     [27240,"1.1543"],
//     [26800,"1.2226"]
//   ]
// }
exports.getOrders = () => {
  return axios.get(BASE_URL + 'order_books')
}

// レート取得
// order_type 注文のタイプ（"sell" or "buy"）
// pair 取引ペア。現在は "btc_jpy" のみです。 
//  amount 注文での量。（例）0.1
// price 注文での金額。（例）28000 
// {
//   "success": true,
//   "rate": 60000,
//   "price": 60000,
//   "amount": 1
// }
exports.getOrderRate = (params) => {
  return axios.get(BASE_URL + 'exchange/orders/rate', {
    params: params || {}
  })
}

// 販売レート取得
// {
//   "rate": "60000"
// }
exports.getRate = (pair) => {
  return axios.get(BASE_URL + 'rate/' + pair)
}