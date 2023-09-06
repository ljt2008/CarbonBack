'use strict'

/**
 * 路由配置
 */

// app/router.js
module.exports = app => {
  require('./routers/user.js')(app)
  require('./routers/layout.js')(app)
  require('./routers/home.js')(app)
  require('./routers/upload.js')(app)
  require('./routers/test.js')(app)
}
