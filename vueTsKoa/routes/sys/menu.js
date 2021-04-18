const router = require('koa-router')()
var uuid = require('uuid');
var DB = require('@utils/sql/mysqlDB')
const sqlModel = require('@utils/sql/sqlModel')

router.prefix('/menu')



router.get('/get', async (ctx, next) => {
    const req = ctx.request.query

    let sqlM = new sqlModel("sys_role")
    const pageNumLeft = (req.page - 1) * req.limit;


    let total = await sqlM.getTotal()
    console.log(total);

    let result = await DB.query(`
        select * from sys_role limit ${pageNumLeft},${req.limit}
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


/**
 * 递归插入菜单表
 * @param {Array} menu 
 * @param {string} id ：当前菜单id 
 */
async function insertMenu(menu, id) {
    if (menu.children && menu.children.length !== 0) {

        for (let i = 0, len = menu.children.length; i < len; i++) {
            let childId = uuid.v4();
            await DB.query(`
                insert into sys_menu(id,path,component,redirect, meta, name,parent_id)
                values('${childId}', '${menu.children[i].path}','${menu.children[i].component}', '${menu.redirect}','${JSON.stringify(menu.children[i].meta)}', '${menu.children[i].name}', '${id}')
        `   )

            if (menu.children[i].children && menu.children[i].children.length !== 0) {
                insertMenu(menu.children[i], childId)
            }

        }
    }

}


router.post('/save', async (ctx, next) => {
    let data = {}
    const req = ctx.request.body.menu;
    // console.log(req[0]);
    console.log(req);

    await DB.query(`
        delete from sys_menu
    `)



    req.forEach(async (menu) => {
        // console.log(menu);
        const id = uuid.v4();
        await DB.query(`
            insert into sys_menu(id,path,component,redirect, meta, name,parent_id)
            values('${id}', '${menu.path}', '${menu.component}', '${menu.redirect}', '${JSON.stringify(menu.meta)}', '${menu.name}', 0)
    `   )

        insertMenu(menu, id)
    })


    data = {
        code: 20000,
        data: {
            msg: "同步成功",
            msgData: {} 
        }
    }


    ctx.response.body = data
})


router.put('/edit', async (ctx) => {
    let data = {}
    const req = ctx.request.body.role

    console.log(ctx.request.body.role);
    if (req.id != '' && req.roleName !== '' && req.enName !== '' && req.roleType !== '' && req.isSys !== '') {
        let result = await DB.query(`
                update  sys_role set name = '${req.roleName}' ,
                enName = '${req.enName}',
                roleType = '${req.roleType}',
                isSys = '${req.isSys}',
                remarks = '${req.remarks}' 
                where id = '${req.id}'
            `)

        data = {
            code: 20000,
            data: {
                msg: "更新成功",
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
