'use strict'
const jwt = require('jsonwebtoken')
const os = require('os')
const { v4: uuidv4 } = require('uuid')
const WechatCrypt = require('./wechatCrypt')
const moment = require('moment')
const fs = require('fs')
const path = require('path')
/**
 * 新旧接口兼容的版本号标识，有不兼容的代码时更新该版本号，主要为了应对审核以及通过 24h 内没有更新到最新版本的用户
 * 当需要发新版本时，用户已全部更新到最新版本，所以每次只要有不兼容的更新，只需要更新该版本号即可
 */
const version = [1, 0, 0]

module.exports = {
  /**
   * 组装菜单树
   * @param {array} data 菜单列表
   * @param {array} parentId 菜单所属的父级
   * @return {array} 组装好的菜单树
   */
  toTreeData(data, parentId = 0) {
    if (data.length <= 0) {
      return []
    }
    function traverse(id) {
      const res = []
      const items = data.filter(item => item.parentId === id)
      if (items.length <= 0) {
        return null
      }
      items.forEach(item => {
        delete item.createdAt
        delete item.updatedAt
        if (item.meta) {
          item.meta = JSON.parse(item.meta)
        }
        res.push({ ...item, children: traverse(item.id) })
      })
      return res
    }
    return traverse(parentId)
  },
  /**
   * 生成 uid
   * @return {string} 例如：9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
   */
  createUid() {
    return uuidv4()
  },
  /**
   * 解密微信数据
   * @param {String} data 微信数据
   * @param {string} data.appId 微信公众号的 appId
   * @param {string} data.sessionKey 微信授权登录成功后的 sessionKey
   * @param {string} data.encryptedData 需要解密的数据
   * @param {string} data.iv 初始向量
   * @return {*} 返回解密后的数据
   */
  wechatCrypt({ appId, sessionKey, encryptedData, iv }) {
    const res = new WechatCrypt(appId, sessionKey)
    return res.decryptData(encryptedData, iv)
  },
  /**
   * 判断版本号是否大于指定版本
   * @param {string} v1 当前版本号
   * @param {string} v2 目标版本号
   * @return {number} 对比结果，1：当前版本大于指定版本，0：当前版本等于指定版本，-1：当前版本小于指定版本
   */
  thanVersion(v1, v2) {
    // 如果没有当前版本号，直接返回
    if (!v1) return 0
    v1 = v1.split('.')
    // 如果没传递目标版本号，则默认使用内置的版本号
    v2 = v2 ? v2.split('.') : version
    const len = Math.max(v1.length, v2.length)
    // 补全版本号位数
    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }
    // 对比版本号
    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i])
      const num2 = parseInt(v2[i])
      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }
    return 0
  },
  /**
   * JSON 转字符串
   * @param {*} data 数据源
   * @return {string} 转换后的 JSON 字符串
   */
  stringify(data) {
    return JSON.stringify(data)
  },
  /**
   * JSON 字符串转 JSON
   * @param {*} data 数据源
   * @return {*} JSON
   */
  parse(data) {
    return JSON.parse(data)
  },
  /**
   * 获取本机 IP 地址
   * @return {string} IP 地址
   */
  getLocalhost() {
    const interfaces = os.networkInterfaces()
    for (const devName in interfaces) {
      const iface = interfaces[devName]
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i]
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address
        }
      }
    }
    return '127.0.0.1'
  },
  /**
   * 请求体部分
   */
  /**
   * 请求成功
   * @param {object} data 响应数据，可以是对象或者数组
   * @param {string} message 提示信息
   */
  success(data, message) {
    const { ctx } = this
    if (data) {
      ctx.body = {
        ...ctx.app.config.resCode.success,
        data,
        message
      }
    } else {
      ctx.body = {
        ...ctx.app.config.resCode.success,
        message
      }
    }

  },

  error(code, message) {
    const { ctx } = this
    ctx.body = {
      code,
      message
    }
  },
  /**
   * 未登录
   */
  notLogged() {
    const { ctx } = this
    ctx.body = ctx.app.config.resCode.notLogged
  },

  nopermission() {
    const { ctx } = this
    ctx.body = ctx.app.config.resCode.nopermission
  },
  // 格式化时间
  formatTime(Time) {
    const { ctx } = this
    return moment(Time).format(ctx.app.config.formatTimet)
  },
  // 创建文件并写入到指定的目录 & 返回客户端结果
  async writeFile(path, file, filename, stream) {
    const { ctx } = this
    return new Promise((resolve, reject) => {
      if (stream) {
        try {
          const readStream = fs.createReadStream(file.filepath),
            writeStream = fs.createWriteStream(path)
          readStream.pipe(writeStream)
          readStream.on('end', () => {
            resolve()
            // 不用删除 egg-mutiply每次请求完删除就好了
            // fs.unlinkSync(file.filepath)
            ctx.body = {
              code: 0,
              codeText: 'upload success',
              originalFilename: filename,
              servicePath: path.replace(ctx.app.baseDir + '/app/public/upload', ctx.app.config.domainname + '/public/upload')
            }
          })
        } catch (err) {
          reject(err)
          ctx.body = {
            code: 1,
            codeText: err
          }
        }
        return
      }
      fs.writeFile(path, file, err => {
        if (err) {
          ctx.body = {
            code: 1,
            codeText: err
          }
          reject(err)
          return
        }
        ctx.body = {
          code: 0,
          codeText: 'upload success',
          originalFilename: filename,
          servicePath: path.replace(ctx.app.baseDir + '/app/public/upload', ctx.app.config.domainname + '/public/upload/')
        }
        resolve()
      })
    })
  },
  // 检测文件是否存在
  async exists(path) {
    return new Promise(resolve => {
      fs.access(path, fs.constants.F_OK, err => {
        if (err) {
          resolve(false)
          return
        }
        resolve(true)
      })
    })
  },
  // 合并文件
  async merge(HASH, count) {
    const { ctx } = this

    return new Promise(async (resolve, reject) => {
      // 文件目录在不在
      const path = `${ctx.app.baseDir}/app/public/upload/${HASH}`
      let fileList = []
      let suffix
      const isExists = await this.ctx.helper.exists(path)
      if (!isExists) {
        reject(new Error('HASH path is not found!'))
        return
      }
      // fs.readdirSync() 是 Node.js 中的一个文件系统模块（fs）提供的同步方法，用于同步地读取指定目录下的文件和文件夹的名称列表。
      fileList = fs.readdirSync(path)
      if (fileList.length < count) {
        reject(new Error('the slice has not been uploaded!'))
        return
      }
      fileList.sort((a, b) => {
        const reg = /_(\d+)/
        return reg.exec(a)[1] - reg.exec(b)[1]
      }).forEach(item => {
        // 因为一开始不知道想合并成什么类型
        !suffix ? suffix = /\.([0-9a-zA-Z]+)$/.exec(item)[1] : null
        fs.appendFileSync(`${ctx.app.baseDir}/app/public/upload/${HASH}.${suffix}`, fs.readFileSync(`${path}/${item}`));
        fs.unlinkSync(`${path}/${item}`)
      })
      fs.rmdirSync(path)
      resolve({
        path: `${ctx.app.baseDir}/app/public/upload/${HASH}.${suffix}`,
        filename: `${HASH}.${suffix}`
      })
    })
  }
}
