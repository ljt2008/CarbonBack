'use strict'
const Ws = require('ws')
module.exports = app => {
  app.beforeStart(async () => {
    const server = new Ws.Server({ port: 8000 })
    const init = () => {
      bindEvent()
    }
    function bindEvent() {
      server.on('open', handleOpen)
      server.on('close', handleClose)
      server.on('error', handleError)
      server.on('connection', handleConnection)
    }
    function handleOpen() {
      console.log('Websocket open')
    }
    function handleClose() {
      console.log('Websocket close')
    }
    function handleError() {
      console.log('Websocket error')
    }
    function handleConnection(ws) {
      console.log('Websocket connected')
      ws.on('message', function handleMessage(msg) {
        const middle = JSON.parse(msg)
        if (middle.type === 'heartBeat-request') {
          ws.send(JSON.stringify({
            type: 'heartBeat-response',
            parmas: {
              message: 'success'
            }
          }))
        }
      })
    }
    init()
    // 挂载 WebSocket 服务器到应用上下文
    app.wss = server
    console.log(server)
  })
}
