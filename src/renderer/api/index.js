const axios = require('axios')
import bitFlyer from './bitflyer'
const apiUrl = (process.env.NODE_ENV === 'production')
  ? 'https://bit-alert.info/api' : 'http://localhost:8000/api'

export const getTick = (tick) => {
  return axios.get(apiUrl + '/tick/' + tick + '.json')
}
export const getTime = () => {
  return axios.get(apiUrl + '/tick/time')
}
export const getBtcTick = (tick) => {
  return axios.get(apiUrl + '/tick/btc/' + tick + '.json')
}
export const getBccTick = (tick) => {
  return axios.get(apiUrl + '/tick/bcc/' + tick + '.json')
}
export const getMonaTick = (tick) => {
  return axios.get(apiUrl + '/tick/mona/' + tick + '.json')
}
export const getEthTick = (tick) => {
  return axios.get(apiUrl + '/tick/eth/' + tick + '.json')
}
