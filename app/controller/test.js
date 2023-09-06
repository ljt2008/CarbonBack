'use strict'
const Controller = require('egg').Controller
const path = require('path')
const fs = require('fs')
class UploadController extends Controller {
    async avatar() {
        const { ctx } = this
        const file = ctx.request.files[0]
    }
    async test1() {
        this.ctx.app.wss.clients.forEach(function (c) {
            c.send(123)
        })
    }
}
module.exports = UploadController
