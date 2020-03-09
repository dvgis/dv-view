/*
 * @Author: Caven
 * @Date: 2020-03-08 20:11:37
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-08 20:23:57
 */

const map = {
  state: {
    currentMap: 0
  },
  mutations: {
    SET_CURRENT_MAP: (state, value) => {
      state.currentMap = value
    }
  },
  actions: {
    setCurrentMap: ({ commit }, value) => {
      commit('SET_CURRENT_MAP', value)
    }
  }
}

export default map
