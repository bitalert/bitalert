const axios = require('axios')
const baseUrl = require('./const').BASE_URL

// {
//   "product_code": "BTC_JPY",
//   "timestamp": "2015-07-08T02:50:59.97",
//   "tick_id": 3579,
//   "best_bid": 30000,
//   "best_ask": 36640,
//   "best_bid_size": 0.1,
//   "best_ask_size": 5,
//   "total_bid_depth": 15.13,
//   "total_ask_depth": 20,
//   "ltp": 31690,
//   "volume": 16819.26,
//   "volume_by_product": 6819.26
// }
exports.getTick = (product_code) => {
  return axios.get(baseUrl + '/v1/getticker', {
    params: {
      product_code
    }
  })
}

exports.getExecutions = (product_code) => {
  return axios.get(baseUrl + '/v1/getexecutions', {
    params: {
      product_code
    }
  })
}

// {
//   "health": "NORMAL",
//   "state": "RUNNING",
// }
exports.getHealth = () => {
  return axios.request(baseUrl + '/v1/getboardstate')
}
