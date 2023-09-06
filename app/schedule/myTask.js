'use strict'
module.exports = {
    schedule: {
        // 定时任务的执行规则，可以是字符串或对象形式
        // 这里示例为每天凌晨 1 点执行任务
        // cron: '0 0 1 * * *',
        interval: '10s', // 也可以使用间隔时间的方式
        type: 'all' // 指定定时任务在所有的 worker 上执行，可以是 worker、all 或者 single
    },
    async task(ctx) {
        // 定时任务的执行逻辑
        // 这里示例为打印一条日志
        ctx.app.wss.clients.forEach(function (c) {
            c.send(JSON.stringify({
                type: 'notice',
                parmas: {
                    href: 'https://www.kuaikanmanhua.com/',
                    message: '抢先充值有赠币'
                }
            }))
        })
    }
}
