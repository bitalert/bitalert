import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: { name: 'coin', params: { coin: 'btc' } }, name: 'index'},
    {path: '/alert', component: require('../components/Main').default, name: 'alert'},
    {path: '/c/:coin', component: require('../components/Main').default, name: 'coin'},
    {
      path: '*',
      redirect: { name: 'index' }
    }
  ]
})
