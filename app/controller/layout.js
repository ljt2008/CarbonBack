'use strict'

const Controller = require('egg').Controller
/**
 * @controller User 用户模块
 */
class LayoutController extends Controller {
    /**
     * @summary 拉取header的navlist
     * @description 注册用户信息
     * @router get /v1/layout/navlist
     */
    async navlist() {
        const { service, helper } = this.ctx
        const navlistresult = await service.nav.queryNavList()
        helper.success(navlistresult, '拉取成功')
    }
}
module.exports = LayoutController
