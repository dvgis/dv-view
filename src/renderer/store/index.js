/*
 * @Author: Caven
 * @Date: 2019-12-23 13:38:42
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-08 20:13:40
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import map from './modules/map'
Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    map
  }
})
