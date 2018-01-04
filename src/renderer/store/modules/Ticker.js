// import storage from '../services/storage'

const state = {
  timer: null,
  failCount: 0
}

const mutations = {
  setTimer (state, timer) {
    state.timer = timer
  },
  setFailCount (state, count) {
    state.count = count
  }
}

const actions = {
  incrFailCount ({state, commit}) {
    commit('setFailCount', state.failCount + 1)
  },
  resetFailCount ({state, commit}) {
    commit('setFailCount', 0)
  },
  startTimer ({commit, state}, interval) {
    if (state.timer) {
      clearInterval(state.timer)
    }
    commit('setFailCount', 0)
    var ret = setInterval(interval, 1000)
    commit('setTimer', ret)
  },
  stopTimer ({commit, state}) {
    if (state.timer) {
      clearInterval(state.timer)
      commit('setTimer', null)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
