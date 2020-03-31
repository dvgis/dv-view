/*
 * @Author: Caven
 * @Date: 2020-03-08 12:36:39
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-31 09:15:09
 */

import Vue from 'vue'
import sql from '../sql'
const fs = require('fs')
const HOME_PATH = process.env.HOME || process.env.USERPROFILE

class DBLoader {
  constructor() {
    initSqlJs({
      locateFile: filename => `static/libs/db/${filename}`
    }).then(SQL => {
      fs.exists(`${HOME_PATH}/.db`, exists => {
        !exists && fs.mkdirSync(`${HOME_PATH}/.db`)
      })
      fs.exists(`${HOME_PATH}/.db/dv.sqlite`, exists => {
        if (!exists) {
          let db = new SQL.Database()
          db.run(sql)
          let buffer = Buffer.from(db.export(), 'base64')
          fs.writeFileSync(`${HOME_PATH}/.db/dv.sqlite`, buffer)
          db.close()
        }
        this._db = new SQL.Database(
          fs.readFileSync(`${HOME_PATH}/.db/dv.sqlite`)
        )
      })
    })
  }

  load() {
    let self = this
    Vue.use({
      install(Vue, options) {
        Vue.prototype.$db = self
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
          `${HOME_PATH}/.db/dv.sqlite`,
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
