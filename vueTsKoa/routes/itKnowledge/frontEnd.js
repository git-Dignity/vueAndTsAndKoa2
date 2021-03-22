const router = require('koa-router')()
var DB = require('../../utils/mysqlDB')
var uuid = require('uuid');
const config = require('../../config/config');
const { uploadFile, unlinkSync } = require('../../utils/upload')
const sqlModel = require('../common')

router.prefix('/itKnowledge/frontEnd')



router.get('/', async (ctx, next) => {
    const req = ctx.request.query
    console.log(req)

    const auth =  req.auth==undefined?'':req.auth
    const title =  req.title==undefined?'':req.title
    const type =  req.type==undefined?'':req.type
    const remarks =  req.remarks==undefined?'':req.remarks
    const uploadTime =  req.uploadTime==undefined?'':req.uploadTime
    const category =  req.category==undefined?'':req.category
    
    console.log(uploadTime)
   

    const pageNumLeft = (req.current - 1) * req.size;
    let sqlM = new sqlModel("itknowledge",`flag = '1' 
    and (auth =  '${auth}' or '${auth} '='')  
    and (title like '%${title}%')
    and (type like '%${type}%')
    and (remarks like '%${remarks}%')
    and (date(upload_time)= '${uploadTime}' or '${uploadTime}'='')  
    and (category =  '${category}' or '${category} '='')  
    `)
   

    let total = await sqlM.getTotal()
    
    
    let result = await DB.query(`
        select * from itknowledge as i
        where i.flag = '1' 
        and (i.auth =  '${auth}' or '${auth} '='')  
        and (i.title like '%${title}%')
        and (i.type like '%${type}%')
        and (i.remarks like '%${remarks}%')
        and (date(i.upload_time)= '${uploadTime}' or '${uploadTime}'='')
        and (i.category =  '${category}' or '${category} '='')  
        limit ${pageNumLeft},${req.size}
    `)

    if(result){
        result.forEach( user =>{
            user.photo = config.url+ user.photo
        })
    }

    
    console.log(result)

  
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
  let result = {}
  const info = JSON.parse(ctx.request.body.info);
  let fileArr = Object.entries(ctx.request.files)

  
  if (fileArr.length != 0) {
    result = await uploadFile(fileArr, 'itKnowledge/frontEnd')
    console.log(result)
    console.log(info, info.type)
    
    await DB.query(`
              insert into itknowledge(title,content,type,auth,remarks,category,photo,photo_name,random_num)
              values('${info.title}','${info.content}','${info.type}','${info.auth}','${info.remarks}','${info.category}','${result[0].fileUrl}','${result[0].fileName}','${result[0].randomNum}')
          `)
    if (result) {
      console.log("添加成功")
      ctx.response.body =  {
        code: 20000,
        data: {
            msg: "添加成功",
            msgData: result
        }
    }
    } else {
      console.log(333)
      ctx.response.body = "添加失败！"
    }
  } else {
    console.log(4444)
    // 没有选择图片
    await DB.query(`
              insert into itknowledge(title,content,type,auth,remarks,category)
              values('${info.title}','${info.content}','${info.type}','${info.auth}','${info.remarks}','${info.category}')
          `)
   
      console.log("添加成功")
      ctx.response.body =  {
        code: 20000,
        data: {
            msg: "添加成功",
            msgData: result
        }
    }
   
  }


  ctx.body = {
    code: 20000,
    data: {
        msg: "添加成功",
        msgData: result
    }
  }

})


/**
 * 修改
 * 
 * 如果有修改图片，先把之前存在本地的图片删除
 */
router.put('/',async (ctx)=>{
    let result = {}
    const req = ctx.request.body.user;
    // console.log(req)

    const info = JSON.parse(ctx.request.body.info);
    let fileArr = Object.entries(ctx.request.files)
    console.log(info, fileArr)
    
    if (fileArr.length != 0) {
        console.log(' update image')

        // 删除旧图片文件
        let selectOneRes = await DB.query(`
            select * from itknowledge 
            where flag = '1' and
            id = '${info.id}'
        `)
        unlinkSync('itKnowledge/frontEnd', `${selectOneRes[0].random_num}_${selectOneRes[0].photo_name}`)
     

       

        result = await uploadFile(fileArr, 'itKnowledge/frontEnd')
        console.log(result)
        
        await DB.query(`
        update  itknowledge set title = '${info.title}',
            content = '${info.content}',
            type = '${info.type}',
            auth = '${info.auth}',
            remarks = '${info.remarks}',
            category = '${info.category}',
            photo = '${result[0].fileUrl}',
            photo_name = '${result[0].fileName}',
            random_num = '${result[0].randomNum}'
        where id = '${info.id}'
              `)
        if (result) {
          console.log("修改成功")
          ctx.response.body =  {
            code: 20000,
            data: {
                msg: "修改成功",
                msgData: result
            }
        }
        } else {
          ctx.response.body = "更新失败！"
        }
      } else {
          console.log('no update image')
        await DB.query(`
        update  itknowledge set title = '${info.title}' ,
            content = '${info.content}',
            type = '${info.type}',
            auth = '${info.auth}',
            remarks = '${info.remarks}',
            category = '${info.category}'
        where id = '${info.id}'
              `)
      
          console.log("修改成功")
          ctx.response.body =  {
            code: 20000,
            data: {
                msg: "修改成功",
                msgData: result
            }
        }
      
      }
    
    
      ctx.body = {
        code: 20000,
        data: {
            msg: "修改成功",
            msgData: result
        }
      }

})




router.delete('/', async (ctx, next) => {
    let data = {}
    const id = ctx.request.query.id

    console.log(id);


    if (id != undefined && id != null && id != '') {


        let result = await DB.query(`
        update  itknowledge set flag = '0' 
        where id = '${id}'
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
