'use strict'
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
// 创建 SparkMD5 实例
const SparkMD5 = require('spark-md5')
// 延迟函数
const delay = function delay(interval) {
    typeof interval !== 'number' ? (interval = 1000) : null
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}

const Controller = require('egg').Controller

class LayoutController extends Controller {
    // 通过formdata上传 multiple插件解析
    async single() {
        const { ctx } = this
        const { app } = this.ctx
        try {
            // 遍历处理多个文件
            for (const file of ctx.request.files) {
                console.log(file)
                console.log('field: ' + file.fieldname)
                console.log('filename: ' + file.filename)
                console.log('encoding: ' + file.encoding)
                console.log('mime: ' + file.mime)
                console.log('tmp filepath: ' + file.filepath)
                // 生成唯一的文件名
                const uniqueFileName = uuidv4() + path.extname(file.filename)
                // 生成目标文件的路径
                const targetPath = path.join(app.baseDir, 'app/public/upload', uniqueFileName)
                // 移动临时文件到目标路径
                await fs.promises.rename(file.filepath, targetPath)
                ctx.body = {
                    code: 0,
                    codeText: 'upload success',
                    originalFilename: file.filename,
                    servicePath: app.config.domainname + '/public/upload/' + uniqueFileName
                }
            }
        } catch (err) {
            ctx.body = {
                code: 1,
                codeText: err
            }
        } finally {
            // 需要删除临时文件
            await ctx.cleanupRequestFiles()
        }
    }
    // 确保内容不重复,通过base64传图片,走的是application/x-www-form-urlencoded
    async single_base64() {
        const { ctx } = this
        const { app, request, helper } = this.ctx
        const filename = request.body.filename
        const spark = new SparkMD5()
        const suffix = /\.([0-9a-zA-Z]+)$/.exec(filename)[1]
        let isExists = false
        let file = request.body.file
        file = decodeURIComponent(file)
        file = file.replace(/^data:image\/\w+;base64,/, '')
        file = Buffer.from(file, 'base64')
        spark.append(file)
        const targetPath = `${app.baseDir}/app/public/upload/${spark.end()}.${suffix}`
        // 检测是否存在
        isExists = await helper.exists(targetPath)
        if (isExists) {
            ctx.body = {
                code: 0,
                codeText: 'file is exists',
                originalFilename: filename,
                servicePath: targetPath.replace(app.baseDir + '/app', app.config.domainname)
            }
            return
        }
        try {
            await helper.writeFile(targetPath, file, filename, false)
        } catch (err) {
            ctx.body = {
                code: 1,
                codeText: err
            }
        }
    }
    // formdata上传 名字已经在前端做了内容hash处理不会冲突
    async single_name() {
        const { ctx } = this
        const { app, helper } = this.ctx
        const file = ctx.request.files[0]
        const filename = ctx.request.body.filename
        // 生成目标文件的路径
        const targetPath = `${app.baseDir}/app/public/upload/${filename}`
        // 检测是否存在
        const isExists = await helper.exists(targetPath)
        // 等待
        await delay()
        if (isExists) {
            ctx.body = {
                code: 0,
                codeText: 'file is exists',
                originalFilename: filename,
                servicePath: targetPath.replace(app.baseDir + '/app', app.config.domainname)
            }
            return
        }
        try {
            // 移动临时文件到目标路径
            await fs.promises.rename(file.filepath, targetPath)
            ctx.body = {
                code: 0,
                codeText: 'file is exists',
                originalFilename: file.filename,
                servicePath: targetPath.replace(app.baseDir + '/app', app.config.domainname)
            }
        } catch (err) {
            ctx.body = {
                code: 1,
                codeText: err
            }
        }
    }
    // 查询是否存在
    async upload_already() {
        const { ctx } = this
        const { app, request, helper } = this.ctx
        const {
            HASH, suffix
        } = request.query
        const path1 = `${app.baseDir}/app/public/upload/${HASH}.${suffix}`
        const isExists = await helper.exists(path1)
        if (isExists) {
            ctx.body = {
                code: 1,
                codeText: '已存在该文件'
            }
            return
        }
        const path = `${app.baseDir}/app/public/upload/${HASH}`
        let fileList = []
        try {
            fileList = fs.readdirSync(path)
            fileList = fileList.sort((a, b) => {
                const reg = /_(\d+)/
                return reg.exec(a)[1] - reg.exec(b)[1]
            })
            ctx.body = {
                code: 0,
                codeText: '123',
                fileList
            }
        } catch (err) {
            ctx.body = {
                code: 0,
                codeText: '456',
                fileList
            }
        }
    }
    // 大文件切片上传
    async upload_chunk() {
        const { ctx } = this
        const { app, helper } = this.ctx
        try {
            const file = ctx.request.files[0]
            const filename = ctx.request.body.filename
            let path = '',
                isExists = false
            // 创建存放切片的临时目录
            const [, HASH] = /^([^_]+)_(\d+)/.exec(filename)
            path = `${app.baseDir}/app/public/upload/${HASH}`
            !fs.existsSync(path) ? fs.mkdirSync(path) : null
            // 把切片存储到临时目录中
            path = `${path}/${filename}`
            console.log(path)
            isExists = await helper.exists(path)
            if (isExists) {
                ctx.body = {
                    code: 0,
                    codeText: 'file is exists',
                    originalFilename: filename,
                    servicePath: path.replace(app.baseDir + '/app', app.config.domainname)
                }
                return
            }
            await helper.writeFile(path, file, filename, true)
        } catch (err) {
            ctx.body = {
                code: 1,
                codeText: err
            }
        } finally {
            // 需要删除临时文件
            await ctx.cleanupRequestFiles()
        }
    }
    // 大文件合并
    async upload_merge() {
        const { ctx } = this
        const { app, request, helper } = this.ctx
        const {
            HASH,
            count
        } = request.body
        try {
            const {
                filename,
                path
            } = await helper.merge(HASH, count)
            ctx.body = {
                code: 0,
                codeText: 'merge success',
                originalFilename: filename,
                servicePath: path.replace(app.baseDir + '/app', app.config.domainname)
            }
        } catch (err) {
            ctx.body = {
                code: 1,
                codeText: err
            }
        }
    }
}

module.exports = LayoutController
