import storage from '../storage'

const state = {
  alerts: storage.loadAlerts() || []
}

const mutations = {
  pushAlert (state, alert) {
    state.alerts.push(alert)
    state.alerts.sort((a, b) => {
      return a > b
    })
    // saveするべきか？
  },
  setAlert (state, alert) {
    let found = false
    for (let i = 0; i < state.alerts.length; i++) {
      if (state.alerts[i].equals(alert)) {
        found = true
        state.alerts[i].copy(alert)
      }
    }
    if (!found) {
      state.alerts.push(alert)
    }
    storage.saveAlerts(state.alerts)
  },
  deleteAlert (state, alert) {
    let count = state.alerts.length
    while (count--) {
      if (state.alerts[count].equals(alert)) {
        state.alerts.splice(count, 1)
        break
      }
    }
    storage.saveAlerts(state.alerts)
  },
  setAlertContinuous (state, matched, notMatched) {
    console.log('alertcontinuous')
    state.alerts.forEach((alert) => {
      for (let i = 0; i < matched.length; i++) {
        if (matched[i].equals(alert)) {
          matched[i].setContinuous(true)
          return
        }
      }
      for (let i = 0; i < notMatched.length; i++) {
        if (notMatched[i].equals(alert)) {
          notMatched[i].setContinuous(false)
          return
        }
      }
    })
  }
}

const actions = {
  setAlert ({commit, state}, alert) {
    commit('setAlert', alert)
  },
  deleteAlert ({commit, state}, alert) {
    commit('deleteAlert', alert)
  },
  setAlertContinuous ({commit, state}, matched, notMatched) {
    commit('setAlertContinuous', matched, notMatched)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
