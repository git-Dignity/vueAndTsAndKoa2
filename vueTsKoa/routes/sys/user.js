const router = require('koa-router')()
var uuid = require('uuid');
// var db = require('../../utils/db')
var DB = require('../../utils/mysqlDB')
const sqlModel = require('../common')
const config = require('../../config/config');

router.prefix('/user')



router.get('/', async (ctx, next) => {
    const req = ctx.request.query
   

    let sqlM = new sqlModel("login")
    const pageNumLeft = (req.page - 1) * req.limit;
    let total = await sqlM.getTotal()
   
    const userName =  req.userName==undefined?'':req.userName
    let result = await DB.query(`
        select * from login 
        where  username =  '${userName}' or '${userName} '=''
        limit ${pageNumLeft},${req.limit}
    `)

    result.forEach( user =>{
        user.photo = config.url+ user.photo
    })

  
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
    const req = ctx.request.body.user

    if (req.id == "") {  // 添加
      
        if (req.id !='' && req.username !== '' && req.phone !== '' && req.roles !== '') {
          
            let result = await DB.query(`
                insert into login(id,username,phone,roles)
                values('${uuid.v4()}','${req.username}','${req.phone}','${req.roles}')
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


router.put('/ID',async (ctx)=>{
    let data = {}
    const req = ctx.request.body.user;
    console.log(req)

    if (req.id !='' && req.username !== '' && req.phone !== '' && req.roles !== '') {
        let result = await DB.query(`
                update  login set username = '${req.username}' ,
                phone = '${req.phone}',
                roles = '${req.roles}'
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
