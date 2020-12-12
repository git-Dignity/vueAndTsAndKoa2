const router = require('koa-router')()
const config = require('../../config/config.js')
const { get } = require('../../utils/request.js')
const { barkSend, serverJiangSend } = require('@api/sendMsg')
var qs = require('qs');
const querystring = require('querystring');
router.prefix('/common')


/**
 * 发信息到微信通知（Server酱）
 */
router.get('/serverJiang/send', async (ctx, next) => {
    const params = ctx.request.query

    let data = {}

    // console.log(params)

    const result = await serverJiangSend({
        text: `【音乐博客】通知亲爱的，你${params.agent}的【${params.title}】已添加到未完成事件，记得完成哦！`,
        desp: `
        内容：${params.content} <br> 
        类型：${params.type} <br />
        进度：${params.schedule} <br />
        开始时间：${params.startTime} <br />
        结束时间：${params.endTime} <br />
        详情请登录:zhengzemin.cn:3000`
    })
   
   
    data = {
        code: 20000,
        data: result
    }
    ctx.response.body = data
})


/**
 * 发信息到Bark
 */
router.get('/bark/send', async (ctx, next) => {
    const params = ctx.request.query
    let data = {}

    // console.log(params)

    const result = await barkSend(params.title)

    data = {
        code: 20000,
        data: result
    }
    ctx.response.body = data
})




module.exports = router
