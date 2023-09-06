'use strict'
module.exports = app => {
    const { router, controller } = app
    router.post('/upload/avatar', controller.test.avatar)
    router.get('/test1', controller.test.test1)
}
