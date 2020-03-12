/*
 * @Author: Caven
 * @Date: 2020-03-10 22:29:00
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-11 00:26:50
 */
const map = {
  state: {
    globe: {
      show: true,
      color: '#0000ff',
      depthTestAgainstTerrain: false
    },
    atmosphere: {
      show: true,
      brightnessShift: 0,
      hueShift: 0,
      saturationShift: 0
    },
    skyBox: {
      show: true
    },
    map: {
      show: true,
      alpha: 1,
      brightness: 1,
      contrast: 1,
      hue: 0,
      gamma: 1,
      saturation: 1
    },
    sun: {
      show: true
    },
    bloom: {
      enable: false,
      contrast: 128,
      brightness: -0.3,
      delta: 1,
      sigma: 3.78,
      stepSize: 5
    }
  },
  mutations: {
    SET_SCENE: (state, type, key, value) => {
      state[type] && state[type][key] && (state[type][key] = value)
    }
  },
  actions: {
    setScene: ({ commit }, type, key, value) => {
      commit('SET_SCENE', type, key, value)
    }
  }
}

export default map
