/*
 * @Author: Caven
 * @Date: 2020-03-07 10:36:08
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-31 09:13:31
 */
import Vue from 'vue'
import appLoader from './App.Loader'
;(async () => {
  if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
  let loaders = await appLoader.install()
  for (let i = 0; i < loaders.length; i++) {
    let loader = loaders[i].default
    if (!loader || !loader.load) continue
    await loader.load()
  }
  Promise.all([
    import('@/App.vue'),
    import('@/router'),
    import('@/store')
  ]).then(([{ default: App }, { default: router }, { default: store }]) => {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  })
})()
