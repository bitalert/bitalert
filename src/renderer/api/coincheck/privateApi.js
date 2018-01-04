const ORDER_TYPE = require('./const').ORDER_TYPE

class PrivateAPI {
  constructor (key, secret) {
    this.key = key || ''
    this.secret = secret || ''
  }

  setKeyAndSecret (key, secret) {
    this.key = key
    this.secret = secret
  }

  __request (method, path, bodyOrParams) {
    let url = baseUrl + path
    let nonce = Date.now().toString()
    let text = nonce + url + (bodyOrParams ? querystring.stringify(bodyOrParams) : '')
    let sign = hex.stringify(hmacSHA256(text, this.__secret))
    return axios({
      method: method,
      url: baseUrl + path,
      params: 'GET' === method ? bodyOrParams : {},
      data: 'GET' !== method ? bodyOrParams : {},
      headers: {
        'ACCESS-KEY': this.__key,
        'ACCESS-NONCE': nonce,
        'ACCESS-SIGNATURE': sign,
        'Content-Type': 'application/json'
      }
    })
  }

// 新規注文
// たとえば、10 BTC を 30000 JPY/BTC で買いたい場合は、以下のように指定します。
// rate: 30000, amount: 10, order_type: "buy", pair: "btc_jpy"
// request
// {
//   "success": true,
//   "id": 12345,
//   "rate": "30010.0",
//   "amount": "1.3",
//   "order_type": "sell",
//   "stop_loss_rate": null,
//   "pair": "btc_jpy",
//   "created_at": "2015-01-10T05:55:38.000Z"
// }
// response
// id 新規注文のID
// rate 注文のレート
// amount 注文の量
// order_type 注文方法
// stop_loss_rate 逆指値レート
// pair 取引ぺア
// created_at 注文の作成日時

  postOrder (order) {
    // check valid order
    switch (order.order_type) {
      case ORDER_TYPE.buy:
      case ORDER_TYPE.sell:
      log.assert(order.rate, 'invalid rate')
      log.assert(order.amount, 'invalid amount')
      break
      case ORDER_TYPE.market_buy:
      // must be jpy
      log.assert(order.market_buy_amount, 'invalid market_buy_amount')
      break
      case ORDER_TYPE.market_sell:
      case ORDER_TYPE.leverage_buy:
      case ORDER_TYPE.leverage_sell:
      log.assert(order.amount, 'invalid amount')
      break
      case ORDER_TYPE.close_long:
      case ORDER_TYPE.close_short:
      log.assert(order.amount, 'invalid amount')
      log.assert(order.position_id, 'invalid position_id')
      break
      default:
      log.error('invlid order_type')
    }
    log.assert(order.pair, 'invalid pair')

    return this.__request('POST', 'exchange/orders', order)
  }

// 未決済の注文一覧
// response
// {
//   "success": true,
//   "orders": [
//     {
//       "id": 202835,
//       "order_type": "buy",
//       "rate": 26890,
//       "pair": "btc_jpy",
//       "pending_amount": "0.5527",
//       "pending_market_buy_amount": null,
//       "stop_loss_rate": null,
//       "created_at": "2015-01-10T05:55:38.000Z"
//     },
  getOrders () {
    return this.__request('GET', 'exchange/orders/opens', {})
  }

// 注文のキャンセル
// response
// {
//   "success": true,
//   "id": 12345
// }
  deleteOrder (id) {
    return this.__request('DELETE', 'exchange/orders/' + id)
  }

// 取引履歴
// response
// {
//   "success": true,
//   "transactions": [
//     {
//       "id": 38,
//       "order_id": 49,
//       "created_at": "2015-11-18T07:02:21.000Z",
//       "funds": {
//         "btc": "0.1",
//         "jpy": "-4096.135"
//       },
//       "pair": "btc_jpy",
//       "rate": "40900.0",
//       "fee_currency": "JPY",
//       "fee": "6.135",
//       "liquidity": "T",
//       "side": "buy"
//     },
  getTransactions () {
    return this.__request('GET', 'exchange/orders/transactions')
  }

// ポジション一覧
// response
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
//       "id": 10,
//       "pair": "btc_jpy",
//       "status": "open",
//       "created_at": "2015-12-02T05:27:53.000Z",
//       "closed_at": null,
  getPositions () {
    return this.__request('GET', 'exchange/leverage/positions')
  }

// 残高
// {
//   "success": true,
//   "jpy": "0.8401",
//   "btc": "7.75052654",
//   "jpy_reserved": "3000.0",
//   "btc_reserved": "3.5002",
//   "jpy_lend_in_use": "0",
//   "btc_lend_in_use": "0.3",
//   "jpy_lent": "0",
//   "btc_lent": "1.2",
//   "jpy_debt": "0",
//   "btc_debt": "0"
// }
  getBalance () {
    return this.__request('GET', 'accounts/balance')
  }

// レバレッジアカウントの残高
// {
//   "success": true,
//   "margin": {
//     "jpy": "131767.22675655"
//   },
//   "margin_available": {
//     "jpy": "116995.98446494"
//   },
//   "margin_level": "8.36743"
// }
  getLeverageBalance () {
    return this.__request('GET', 'accounts/leverage_balance')
  }

// ビットコインの送金
// address 送り先のビットコインアドレス
// amount 送りたいビットコインの量
// response
// {
//   "success": true,
//   "id": "276",
//   "address": "1v6zFvyNPgdRvhUufkRoTtgyiw1xigncc",
//   "amount": "1.5",
//   "fee": "0.002"
// } 
 postSendMoney (address, amount) {
   return this.__request('POST', 'send_money', {
     address,
     amount
   })
 }

// 送金履歴
// currency 通貨（現在は BTC のみ対応）
// response
//  {
//   "success": true,
//   "sends": [
//     {
//       "id": 2,
//       "amount": "0.05",
//       "currency": "BTC",
//       "fee": "0.0",
//       "address": "13PhzoK8me3u5nHzzFD85qT9RqEWR9M4Ty",
//       "created_at": "2015-06-13T08:25:20.000Z"
//     },
  getSendMoney () {
    return this.__request('GET', 'send_money', {
      currency: 'BTC'
    })
  }

// 受け取り履歴
// currency 通貨（現在は BTC のみ対応）
// response
// {
//   "success": true,
//   "deposits": [
//     {
//       "id": 2,
//       "amount": "0.05",
//       "currency": "BTC",
//       "address": "13PhzoK8me3u5nHzzFD85qT9RqEWR9M4Ty",
//       "status": "confirmed",
//       "confirmed_at": "2015-06-13T08:29:18.000Z",
//       "created_at": "2015-06-13T08:22:18.000Z"
//     },
  getDepositMoney () {
    return this.__request('GET', 'deposit_money', {
      currency: 'BTC'
    })
  }

// ビットコインの高速入金
// id ビットコイン受取履歴 のID
// response
// {
//   "success": true
// }
  postDepositMoneyFast (id) {
    return this.__request('POST', 'deposit_money/' + id + '/fast')
  }

// アカウント情報
// {
//   "success": true,
//   "id": 10000,
//   "email": "test@gmail.com",
//   "identity_status": "identity_pending",
//   "bitcoin_address": "1v6zFvyNPgdRvhUufkRoTtgyiw1xigncc",
//   "lending_leverage": "3.0",
//   "taker_fee": "0.15",
//   "maker_fee": "0.0"
// }
  getAccount () {
    return this.__request('GET', 'accounts')
  }

// 銀行口座一覧
// {
//   "success": true,
//   "data": [
//     {
//       "id": 243,
//       "bank_name": "みずほ",
//       "branch_name": "東京営業部",
//       "bank_account_type": "futsu",
//       "number": "0123456",
//       "name": "タナカ　タロウ"
//     }
//   ]
// }
  getBankAccounts () {
    return this.__request('GET', 'bank_accounts')
  }

// 銀行口座の登録
// body
// *bank_name 銀行名
// *branch_name 支店名
// *bank_account_type 銀行口座の種類（futsu : 普通口座, toza : 当座預金口座）
// *number 口座番号（例）"0123456"
// *name 口座名義
// response
// {
//   "success": true,
//   "data": {
//     "id": 641,
//     "bank_name": "熊本",
//     "branch_name": "田中",
//     "bank_account_type": "futsu",
//     "number": "0123456",
//     "name": "hoge"
//   }
  postBankAccount (body) {
    return this.__request('POST', 'bank_accounts', body)
  }

// 銀行口座の削除
// *id 銀行口座一覧のID
// response
// {
//   "success": true
// }
  deleteBankAccount (id) {
    return this.__request('DELETE', 'bank_accounts/' + id)
  }

// 出金履歴
// response
// {
//   "success": true,
//   "pagination": {
//     "limit": 25,
//     "order": "desc",
//     "starting_after": null,
//     "ending_before": null
//   },
//   "data": [
//     {
//       "id": 398,
//  status 出金の状態 ( pending 未処理, processing 手続き中, finished 完了, canceled キャンセル済み) 
//       "status": "finished",
//       "amount": "242742.0",
//       "currency": "JPY",
//       "created_at": "2014-12-04T15:00:00.000Z",
//       "bank_account_id": 243,
//       "fee": "400.0",
//       "is_fast": true
//     }
//   ]
// }
  getWithdraws () {
    return this.__request('GET', 'withdraws')
  }

// 出金申請の作成
// body
// *bank_account_id 銀行口座のID
// *amount 金額
// *currency 通貨 ( 現在は "JPY" のみ対応)
// response
// {
//   "success": true,
//   "data": {
//     "id": 1043,
//     "status": "pending",
//     "amount": "10000.0",
//     "currency": "JPY",
//     "created_at": "2015-08-31T11:32:45.213Z",
//     "bank_account_id": 243,
//     "fee": "300.0"
//   }
// }
  postWithdraws (body) {
    return this.__request('POST', 'withdraws', body)
  }

// 出金申請のキャンセル
// id 出金申請のID
// response
// {
//   "success": true
// }
  deleteWithdraws (id) {
    return this.__request('DELETE', 'withdraws/' + id)
  }


// 借り入れ申請

// *amount 借りたい量
// *currency 通貨（BTC, ETH）
// response
// {
//   "success": true,
//   "id": 12345,
//   "rate": "0.0005",
//   "amount": "1.3",
//   "currency": "BTC",
//   "created_at": "2015-01-10T05:55:38.000Z"
// }
  postLend (amount, currency) {
    return this.__request('POST', 'lending/borrows', {
      amount,
      currency
    })
  }

// 借入中一覧
// response
// {
//   "success": true,
//   "matches": [
//     {
//       "id": 12345,
//       "borrow_id": 6789,
//       "rate": "0.0005",
//       "amount": "1.3",
//       "pending_amount": "1.30065",
//       "currency": "BTC",
//       "deadline": "2015-01-10T05:55:38.000Z"
//     }
//   ]
// }
  getLends () {
    return this.__request('GET', 'lending/borrows/matches')
  }

// 返済
// id 借入中一覧のID
// response
// {
//   "success": true,
//   "id": 12345
// }
  postLendBack (id) {
    return this.__request('POST', 'lending/borrows/' + id + '/repay', {})
  }


// レバレッジアカウントへ振替
// *currency 通貨（現在は JPY のみ対応）
// *amount 移動する数量
// response
// {
//   "success": true
// }
  postTransformToLeverage (currency, amount) {
    return this.__request('POST', 'exchange/transfers/to_leverage', {
      currency,
      amount
    })
  }

// レバレッジアカウントから振替
// *currency 通貨（現在は JPY のみ対応）
// *amount 移動する数量
// response
// {
//   "success": true
// }
 postTransformFromLeverage (currency, amount) {
   return this.__request('POST', 'exchange/transfers/from_leverage', {
     currency,
     amount
   })
 }
}

module.exports = (apiKey, secretKey) => {
  return new PrivateAPI(apiKey, secretKey)
}
