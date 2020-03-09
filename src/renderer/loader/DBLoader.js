/*
 * @Author: Caven
 * @Date: 2020-03-08 12:36:39
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-09 11:51:40
 */

import Vue from 'vue'

const fs = require('fs')
const path = require('path')

class DBLoader {
  constructor() {
    this._db = undefined
  }

  load() {
    let self = this
    Vue.use({
      install(Vue, options) {
        self._db = global.DB
        Vue.prototype.$db = self
        delete global.DB
      }
    })
  }

  exec(sql) {
    return new Promise((resolve, reject) => {
      let result = []
      try {
        let res = this._db.exec(sql)
        if (res) {
          res.forEach(data => {
            let columns = data.columns
            let values = data.values
            let dataSet = values.map(item => {
              let dataRow = {}
              item.forEach((column, index) => {
                dataRow[columns[index]] = column
              })
              return dataRow
            })
            result.push(dataSet)
          })
        }
        resolve(result)
      } catch (e) {
        reject(e)
      }
    })
  }

  prepare(sql, params = {}) {
    return new Promise((resolve, reject) => {
      let result = []
      try {
        let stmt = this._db.prepare(sql)
        stmt.bind(params)
        while (stmt.step()) {
          result.push(stmt.getAsObject())
        }
        stmt.free()
        resolve(result)
      } catch (e) {
        reject(e)
      }
    })
  }

  run(sql, params = {}) {
    return new Promise((resolve, reject) => {
      try {
        this._db.run(sql, params)
        let data = this._db.export()
        fs.writeFileSync(
          process.env.HOME + '/.db/dv.sqlite',
          Buffer.from(data, 'base64')
        )
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }
}

const dbLoader = new DBLoader()
export default dbLoader
