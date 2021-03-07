const router = require('koa-router')()
var uuid = require('uuid');
var DB = require('../../utils/mysqlDB')
const sqlModel = require('../common')
const config = require('../../config/config.js')
const { get, post, put, del } = require('../../utils/request.js')
var qs = require('qs');


router.prefix('/featuresDev')



router.get('/', async (ctx, next) => {
    const req = ctx.request.query
    console.log(req)

    const title =  req.title==undefined?'':req.title
    const front_end =  req.front_end==undefined?'':req.front_end
    const node =  req.node==undefined?'':req.node
    const database_sql =  req.database_sql==undefined?'':req.database_sql
    const remarks =  req.remarks==undefined?'':req.remarks

 
    const pageNumLeft = (req.current - 1) * req.size;
    let sqlM = new sqlModel("features",`flag = '1'
    and (title like  '%${title}%' or '${title} '='')  
    and (front_end like  '%${front_end}%' or '${front_end} '='')  
    and (node like  '%${node}%' or '${node} '='')  
    and (database_sql like  '%${database_sql}%' or '${database_sql} '='')  
    and (remarks like '%${remarks}%' or '${remarks} '='')  
    `)
    let total = await sqlM.getTotal()
    
    
    let result = await DB.query(`
        select * from features as i
        where i.flag = '1' 
        and (title like  '%${title}%' or '${title} '='')  
        and (front_end like  '%${front_end}%' or '${front_end} '='')  
        and (node like  '%${node}%' or '${node} '='')  
        and (database_sql like  '%${database_sql}%' or '${database_sql} '='')  
        and (remarks like '%${remarks}%' or '${remarks} '='')  
        limit ${pageNumLeft},${req.size}
    `)
    
    // console.log(result)

  
    data = {
        code: 20000,
        status:1,
        data: {
            items: result,
            total: total
        },
        message:[]
    }
  
    ctx.response.body = data
})



router.post('/', async (ctx, next) => {
    let data = {}
    const params = ctx.request.body

    console.log(params);
    


    const result = await DB.query(`
        insert into features(title,front_end,node,java,database_sql,auth,remarks)
        values('${params.title}','${params.front_end}','${params.node}','${params.java}','${params.database_sql}','${params.auth}','${params.remarks}')
    `)
  



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
router.put('/', async (ctx) => {
    let data = {}
    const params = ctx.request.body;
    // console.log(params)

    
    

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




router.delete('/', async (ctx, next) => {
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




    ctx.response.body = data
})







module.exports = router
