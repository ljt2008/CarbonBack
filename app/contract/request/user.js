'use strict'
const Email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
module.exports = {
  RequestLogin: {
    usernameOrEmail: { type: 'string', required: true, description: '邮箱或者用户名', message: '邮箱或者用户名不能为空' },
    password: { type: 'string', required: true, description: '密码', message: '密码不能为空' }
  },
  RequestRegister: {
    username: { type: 'string', required: true, description: '用户名' },
    email: { type: 'string', required: true, pattern: Email, description: '邮箱' },
    password: { type: 'string', required: true, description: '用户密码' },
    avatar_url: { type: 'string', required: true, description: '用户头像' }
  },
  RequestUpdateUser: {
    username: { type: 'string', required: false },
    email: { type: 'string', required: false, pattern: Email },
    avatar_url: { type: 'string', required: false, description: '用户头像' }
  },
  RequestcheckExist: {
    username: { type: 'string', required: false },
    email: { type: 'string', required: false, pattern: Email }
  },
  RequestsearchUsersByEmail: {
    email: { type: 'string', required: false }
  },
  RequestUserInfo: {
    user_id: { type: 'string', required: true, description: '用户id', message: '用户id' }
  }
}
