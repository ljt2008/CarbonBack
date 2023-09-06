'use strict'
const Service = require('egg').Service
// Service
class NavService extends Service {
    async queryNavList() {
        const user = await this.ctx.model.Nav.findAll()
        return user
    }
}
module.exports = NavService
