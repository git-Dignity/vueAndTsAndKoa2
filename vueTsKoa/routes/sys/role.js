const router = require('koa-router')()
var uuid = require('node-uuid');
// var db = require('../../utils/db')
var DB = require('../../utils/mysqlDB')
const sqlModel = require('../common')

router.prefix('/role')



router.get('/getRole', async (ctx, next) => {
    const req = ctx.request.query

    let sqlM = new sqlModel("sys_role")


    let total = await sqlM.getTotal()
    console.log(total);

    let result = await DB.query(`
        select * from sys_role limit ${req.page},${req.limit}
    `)


    data = {
        code: 20000,
        data: {
            items: result,
            total: total
        }
    }



    ctx.response.body = data
})



router.post('/save', async (ctx, next) => {
    let data = {}
    const req = ctx.request.body.article
    // let req_sql_inje = []
    // for(let key in req){
    //     req_sql_inje[key] = escape(req[key])   // 格式化 预防sql注入
    // }

    if (req.id == undefined) {  // 添加
        if (req.roleName != '' && req.enName != '' && req.roleType != '' && req.isSys != '') {

            let result = await DB.query(`
                insert into sys_role(id,name,enName,roleType,isSys,remarks)
                values('${uuid.v4()}','${req.roleName}','${req.enName}','${req.roleType}','${req.isSys}','${req.remarks}')
            `)

            data = {
                code: 20000,
                data: {
                    msg: "添加成功",
                    msgData: result
                }
            }

        } else {
            data = {
                code: 400,
                data: {
                    msg: "缺少参数",
                    msgData: result
                }
            }
        }
    } else {
        //修改、更新
        consoel.log(555)
    }

    ctx.response.body = data
})




module.exports = router
