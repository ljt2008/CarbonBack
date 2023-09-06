'use strict'
module.exports = app => {
    const { router, controller } = app

    // 设置统一的前缀，前缀地址在 config/config.default.js 中配置
    const subRouter = router.namespace(app.config.apiPrefix)

    // 拉取导航内容
    subRouter.get('/v1/layout/navlist', controller.layout.navlist)

}
