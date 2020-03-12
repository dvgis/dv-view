/*
 * @Author: Caven
 * @Date: 2019-12-23 13:38:42
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-10 22:31:42
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import map from './modules/map'
import scene from './modules/scene'
Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    map,
    scene
  }
})
