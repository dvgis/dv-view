/*
 * @Author: Caven
 * @Date: 2020-03-07 10:36:08
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-09 12:46:12
 */
import Vue from 'vue'
import appLoader from './App.Loader'
import sql from './sql'
let fs = require('fs')

;(async () => {
  if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
  await initSqlJs({
    locateFile: filename => `static/libs/db/${filename}`
  }).then(SQL => {
    fs.exists(process.env.HOME + '/.db', exists => {
      !exists && fs.mkdirSync(process.env.HOME + '/.db')
    })
    fs.exists(process.env.HOME + '/.db/dv.sqlite', exists => {
      let db = undefined
      if (!exists) {
        db = new SQL.Database()
        db.run(sql)
        let buffer = Buffer.from(db.export(), 'base64')
        fs.writeFileSync(process.env.HOME + '/.db/dv.sqlite', buffer)
        db.close()
      }
      db = new SQL.Database(
        fs.readFileSync(process.env.HOME + '/.db/dv.sqlite')
      )
      global.DB = db
    })
  })
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
