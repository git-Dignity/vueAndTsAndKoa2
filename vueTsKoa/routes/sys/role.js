const router = require('koa-router')()
var uuid = require('uuid');
var DB = require('@utils/sql/mysqlDB')
const sqlModel = require('@utils/sql/sqlModel')

router.prefix('/role')



router.get('/getRole', async (ctx, next) => {
    const req = ctx.request.query

    let sqlM = new sqlModel("sys_role")
    const pageNumLeft = (req.page - 1) * req.limit;


    let total = await sqlM.getTotal()
    console.log(total);

    const roleKey =  req.roleKey==undefined?'':req.roleKey

    let result = await DB.query(`
        select * from sys_role 
        where  roleKey =  '${roleKey}' or '${roleKey} '=''
        limit ${pageNumLeft},${req.limit}
    `)

    

    result.forEach( (role) => {
        if(role.routes === null){
            role.routes = []
        }else{
            role.routes = JSON.parse(role.routes);
        }
    })



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
    const req = ctx.request.body.role

    if (req.id == "") {  // 添加
        console.log(req.name, req.roleKey, req.roleType, req.isSys)
        if (req.name !== '' && req.roleKey !== '' && req.roleType !== '' && req.isSys !== '') {

            let result = await DB.query(`
                insert into sys_role(id,name,roleKey,roleType,isSys,remarks, routes)
                values('${uuid.v4()}','${req.name}','${req.roleKey}','${req.roleType}','${req.isSys}','${req.remarks}', '${JSON.stringify(req.routes)}')
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
                    msgData: 'err'
                }
            }
        }
    } else {
        //修改、更新
        consoel.log(555)
    }

    ctx.response.body = data
})


router.put('/edit',async (ctx)=>{
    let data = {}
    const req = ctx.request.body.role;
    console.log(req.routes)

    console.log(ctx.request.body.role);
    if (req.id !='' && req.name !== '' && req.roleKey !== '' && req.roleType !== '' && req.isSys !== '') {
        let result = await DB.query(`
                update  sys_role set name = '${req.name}' ,
                roleKey = '${req.roleKey}',
                roleType = '${req.roleType}',
                isSys = '${req.isSys}',
                remarks = '${req.remarks}', 
                routes = '${JSON.stringify(req.routes)}'
                where id = '${req.id}'
            `)

            data = {
                code: 20000,
                data: {
                    msg: "更新成功",
                    msgData: result
                }
            }

    }else{
        data = {
            code: 400,
            data: {
                msg: "缺少参数",
                msgData: 'err'
            }
        }
    }

    ctx.response.body = data
})




router.post('/del', async (ctx, next) => {
    let data = {}
    const id = ctx.request.body.id

    console.log(id);


    if (id != undefined && id != null && id != '') {


        let result = await DB.query(`
            delete from sys_role where id = '${id}'
        `)

        data = {
            code: 20000,
            data: {
                msg: "删除成功",
                msgData: result
            }
        }

    } else {
        data = {
            code: 400,
            data: {
                msg: "id不可为空",
                msgData: 'err'
            }
        }
    }



    ctx.response.body = data
})




module.exports = router
