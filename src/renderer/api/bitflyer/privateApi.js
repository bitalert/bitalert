const axios = require('axios')
const querystring = require('querystring');
const hmacSHA256 = require('crypto-js/hmac-sha256')
const hex = require('crypto-js/enc-hex')
const baseUrl = require('./const').BASE_URL


class BitFlyer {
  constructor (key, secret) {
    this.__key = ''
    this.__secret = ''
  }

  __request (method, path, bodyOrParam) {
    let timestamp = Date.now().toString()
    let text = timestamp + method + path + 'GET' !== method  && bodyOrParams ? JSON.stringify(bodyOrParams) : ''
    let sign = hex.stringify(hmacSHA256(text, this.__secret))
    return axios({
      method: method,
      url: baseUrl + path,
      params: 'GET' === method ? bodyOrParams : {},
      data: 'GET' !== method ? bodyOrParams : {},
      headers: {
        'ACCESS-KEY': this.__key,
        'ACCESS-TIMESTAMP': timestamp,
        'ACCESS-SIGN': sign,
        'Content-Type': 'application/json'
      }
    })
  }

  setKeyAndSecret (key, secret) {
    this.___key = key
    this.___secret = secret
  }

// [
//   "/v1/me/getpermissions",
//   "/v1/me/getbalance",
//   "/v1/me/getcollateral",
//   "/v1/me/getchildorders",
//   "/v1/me/getparentorders",
//   "/v1/me/getparentorder",
//   "/v1/me/getexecutions",
//   "/v1/me/getpositions"
// ]
  getPermissions () {
    return this.__request('GET', '/v1/me/getpermissions')
  }

// 資産残高を取得
// [
//   {
//     "currency_code": "JPY",
//     "amount": 1024078,
//     "available": 508000
//   },
//   {
//     "currency_code": "BTC",
//     "amount": 10.24,
//     "available": 4.12
//   },
//   {
//     "currency_code": "ETH",
//     "amount": 20.48,
//     "available": 16.38
//   }
// ]
  getBalance () {
    return this.__request('GET', '/v1/me/getbalance')
  }

  // 証拠金の状態を取得
// {
//   預け入れた証拠金の評価額（円）です
//   "collateral": 100000,
//   建玉の評価損益（円）です。
//   "open_position_pnl": -715,
//   現在の必要証拠金（円）です。
//   "require_collateral": 19857,
//   現在の証拠金維持率です。
//   "keep_rate": 5.000
// }
  getCollateral () {
    return this.__request('GET', '/v1/me/getcollateral')
  }

// 預入用アドレス取得
// [
//   {
//     "type": "NORMAL",
//     "currency_code": "BTC",
//     "address": "3AYrDq8zhF82NJ2ZaLwBMPmaNziaKPaxa7"
//   },
//   {
//     "type": "NORMAL",
//     "currency_code": "ETH",
//     "address": "0x7fbB2CC24a3C0cd3789a44e9073381Ca6470853f"
//   }
// ]
  getAddresses () {
    return this.__request('GET', '/v1/me/getaddresses')
  }

// 仮想通貨預入履歴
// [
//   {
//     "id": 100,
//     "order_id": "CDP20151227-024141-055555",
//     "currency_code": "BTC",
//     "amount": 0.00002,
//     "address": "1WriteySQufKZ2pVuM1oMhPrTtTVFq35j",
//     "tx_hash": "9f92ee65a176bb9545f7becb8706c50d07d4cee5ffca34d8be3ef11d411405ae",
//     "status": "COMPLETED",
//     "event_date": "2015-11-27T08:59:20.301"
//   }
// ]
  getCoinins () {
    return this.__request('GET', '/v1/me/getcoinins')
  }

// 仮想通貨送付履歴
// [
//   {
//     "id": 500,
//     "order_id": "CWD20151224-014040-077777",
//     "currency_code": "BTC",
//     "amount": 0.1234,
//     "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
//     "tx_hash": "724c07dfd4044abcb390b0412c3e707dd5c4f373f0a52b3bd295ce32b478c60a",
//     "fee": 0.0005,
//     "additional_fee": 0.0001,
//     "status": "COMPLETED",
//     "event_date": "2015-12-24T01:40:40.397"
//   }
// ]
  getCoinouts () {
    return this.__request('GET', '/v1/me/getcoinouts')
  }

// 銀行口座一覧取得
// [
//   {
//     "id": 3402,
//     "is_verified": true,
//     "bank_name": "三井住友銀行",
//     "branch_name": "アオイ支店",
//     "account_type": "普通",
//     "account_number": "1111111",
//     "account_name": "ビットフライヤータロウ"
//   }
// ]
  getCoinouts () {
    return this.__request('GET', '/v1/me/getbankaccounts')
  }

// 入金履歴
// [
//   {
//     "id": 300,
//     "order_id": "MDP20151014-101010-033333",
//     "currency_code": "JPY",
//     "amount": 10000,
//     "status": "COMPLETED",
//     "event_date": "2015-10-14T10:10:10.001"
//   }
// ]
  getDeposits () {
    return this.__request('GET', '/v1/me/getdeposits')
  }

// 出金
// body
// {
//   "currency_code": "JPY",
//   "bank_account_id": 1234,
//   "amount": 12000,
//   "code": "012345"
// }
// response
// {
//   "message_id": "69476620-5056-4003-bcbe-42658a2b041b"
// }
// error response
// {
//   "status": -700,
//   "error_message": "This account has not yet been authenticated",
//   "data": null
// }
  postWithdraw (body) {
    return this.__request('POST', '/v1/me/withdraw', body)
  }

// 出金履歴
// [
//   {
//     "id": 700,
//     "order_id": "MWD20151020-090909-011111",
//     "currency_code": "JPY",
//     "amount": 12000,
//     "status": "COMPLETED",
//     "event_date": "2015-10-20T09:09:09.416"
//   }
// ]
  getWithdrawals () {
    return this.__request('GET', '/v1/me/getwithdrawals')
  }

// 新規注文を出す
// body
// {
//   "product_code": "BTC_JPY",
//   "child_order_type": "LIMIT",
//   "side": "BUY",
//   "price": 30000,
//   "size": 0.1,
//   "minute_to_expire": 10000,
//   "time_in_force": "GTC"
// }
// response statuscode 200
// {
//     "child_order_acceptance_id": "JRF20150707-050237-639234"
// }
  postOrder (body) {
    return this.__request('POST', '/v1/me/sendparentorder', body)
  }

// 注文をキャンセルする
// body
// {
//   "product_code": "BTC_JPY",
//   "child_order_id": "JOR20150707-055555-022222"
// }

// {
//   "product_code": "BTC_JPY",
//   "child_order_acceptance_id": "JRF20150707-033333-099999"
// }
  postCancelOrder (body) {
    return this.__request('POST', '/v1/me/cancelchildorder', body)
  }

// TODO: 特殊注文

// すべての注文をキャンセルする
// body
// {
//   "product_code": "BTC_JPY"
// }
  postCancelAllOrder (body) {
    return this.__request('POST', '/v1/me/cancelallchildorders', body)
  }

// 注文の一覧を取得
// [
//   {
//     "id": 138398,
//     "child_order_id": "JOR20150707-084555-022523",
//     "product_code": "BTC_JPY",
//     "side": "BUY",
//     "child_order_type": "LIMIT",
//     "price": 30000,
//     "average_price": 30000,
//     "size": 0.1,
//     "child_order_state": "COMPLETED",
//     "expire_date": "2015-07-14T07:25:52",
//     "child_order_date": "2015-07-07T08:45:53",
//     "child_order_acceptance_id": "JRF20150707-084552-031927",
//     "outstanding_size": 0,
//     "cancel_size": 0,
//     "executed_size": 0.1,
//     "total_commission": 0
//   },
  getOrders () {
    return this.__request('GET', '/v1/me/getchildorders')
  }

// 約定の一覧を取得
// [
//   {
//     "id": 37233,
//     "child_order_id": "JOR20150707-060559-021935",
//     "side": "BUY",
//     "price": 33470,
//     "size": 0.01,
//     "commission": 0,
//     "exec_date": "2015-07-07T09:57:40.397",
//     "child_order_acceptance_id": "JRF20150707-060559-396699"
//   },
  getExecutions (params /* product_code */) {
    return this.__request('GET', '/v1/me/getexecutions', params)
  }

// 建玉の一覧を取得
// [
//   {
//     "product_code": "FX_BTC_JPY",
//     "side": "BUY",
//     "price": 36000,
//     "size": 10,
//     "commission": 0,
//     "swap_point_accumulate": -35,
//     "require_collateral": 120000,
//     "open_date": "2015-11-03T10:04:45.011",
//     "leverage": 3,
//     "pnl": 965
//   }
// ]
  getPositions (params /* product_code */) {
    return this.__request('GET', '/v1/me/getpositions', { product_code: 'FX_BTC_JPY' })
  }

// 証拠金の変動履歴を取得
// [
//   {
//     "id": 4995,
//     "currency_code": "JPY",
//     "change": -6,
//     "amount": -6,
//     "reason_code": "CLEARING_COLL",
//     "date": "2017-05-18T02:37:41.327"
//   },
  getCollateralHistory () {
    return this.__request('GET', '/v1/me/getcollateralhistory')
  }

// 取引手数料を取得
// {
//   "commission_rate": 0.001
// }
  getTradingCommission (params /* product_code */) {
    return this.__request('GET', '/v1/me/gettradingcommission', params)
  }
}


module.exports = (apiKey, secretKey) => {
  new BitFlyer(apiKey, secretKey)
}