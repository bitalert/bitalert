const axios = require('axios')

const apiUrl = 'https://bit-alert.info/api'

export const getTick = (tick) => {
  return axios.get(apiUrl + '/tick/' + tick + '.json', {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
}
export const getTime = () => {
  return axios.get(apiUrl + '/tick/time', {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
}
// export const getBtcTick = (tick) => {
//   return axios.get(apiUrl + '/tick/btc/' + tick + '.json')
// }
// export const getBccTick = (tick) => {
//   return axios.get(apiUrl + '/tick/bcc/' + tick + '.json')
// }
// export const getMonaTick = (tick) => {
//   return axios.get(apiUrl + '/tick/mona/' + tick + '.json')
// }
// export const getEthTick = (tick) => {
//   return axios.get(apiUrl + '/tick/eth/' + tick + '.json')
// }
