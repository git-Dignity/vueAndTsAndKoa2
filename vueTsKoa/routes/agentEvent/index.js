const router = require('koa-router')()
var uuid = require('uuid');
var DB = require('@utils/sql/mysqlDB')
const sqlModel = require('@utils/sql/sqlModel')
const config = require('../../config/config.js')
const { get, post, put, del } = require('../../utils/request.js')
var qs = require('qs');
const { specifiedTime } = require('../common/schedule')
const { specifiedTimeFormat } = require('../../utils/date')
const { executeTimeout, specifiedTimeSend } = require('./server/agentEventService')


router.prefix('/agentEvent')

 

router.get('/get', async (ctx, next) => {
    const params = ctx.request.query

    let data = {}

    // console.log(params)

    const result = await get({
        uri: config.javaUrl + '/agentEvent/get',
        qs: params
    })


    data = {
        code: 20000,
        data: result
    }
    ctx.response.body = data
})



router.post('/save', async (ctx, next) => {
    let data = {}
    const params = ctx.request.body

  

    // 在指定时间执行方法
    let j = specifiedTimeSend(params)
  



    const result = await post({
        uri: config.javaUrl + '/agentEvent/save',
        qs: params
    })



    data = {
        code: 20000,
        data: {
            msg: "添加成功",
            msgData: result
        }
    }

    ctx.response.body = data
})


let tmpTime = null; // 全局定时器
router.put('/edit', async (ctx) => {
    let data = {}
    const params = ctx.request.body;
    // console.log(params)

    
    // 执行定时器
    tmpTime = executeTimeout(params, tmpTime)    
    

    // save data
    const result = await put({
        uri: config.javaUrl + '/agentEvent/edit',
        qs: qs.stringify(params)
    })

    data = {
        code: 20000,
        data: {
            msg: "修改成功",
            msgData: result
        }
    }

    ctx.response.body = data
})




router.delete('/delete', async (ctx, next) => {
    let data = {}
    const id = ctx.request.query.id

    console.log(id);

   
    
    const result = await del({
        uri: config.javaUrl + '/agentEvent/delete',
        qs: id
    })

    data = {
        code: 20000,
        data: {
            msg: "删除成功",
            msgData: result
        }
    }

    ctx.response.body = data
})







module.exports = router
