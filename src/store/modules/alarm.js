import { getalarmbar } from '@/api/alarm'

const state = {
  alarmbar: 0
}

const mutations = {
  ALARM_BAR: (state, value) => {
    state.alarmbar = value
  }
}
const actions = {
  Getalarm({ commit, state }) {
    return new Promise((resolve, reject) => {
      getalarmbar().then(res => {
        const data = res.data.alarmbar
        commit('ALARM_BAR', data)
        resolve(data)
      }).catch(err => reject(err))
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
