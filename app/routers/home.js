'use strict'
module.exports = app => {
    const { router, controller } = app

    // 设置统一的前缀，前缀地址在 config/config.default.js 中配置
    const subRouter = router.namespace(app.config.apiPrefix)

    // 拉取导航内容
    subRouter.get('/v1/home/categoryList', controller.home.categoryList)

    // 拉取编辑推荐
    subRouter.get('/v1/home/editorsChoice', controller.home.editorsChoice)

    // 拉取最新上架
    subRouter.get('/v1/home/news', controller.home.news)

    // 拉取猜你喜欢
    subRouter.get('/v1/home/hots', controller.home.hots)

}
