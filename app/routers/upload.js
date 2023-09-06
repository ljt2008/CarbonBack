'use strict'
module.exports = app => {
    const { router, controller } = app
    router.post('/upload_single', controller.file.single)
    router.post('/upload_single_base64', controller.file.single_base64)
    router.post('/upload_single_name', controller.file.single_name)
    router.get('/upload_already', controller.file.upload_already)
    router.post('/upload_chunk', controller.file.upload_chunk)
    router.post('/upload_merge', controller.file.upload_merge)

}
