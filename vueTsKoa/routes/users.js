const router = require('koa-router')()
var DB = require('../utils/mysqlDB')
var uuid = require('uuid');
let { func, uploadToQiniu} = require('../utils/qianniuyun');  /*导入七牛文件   */
const formidable = require('formidable');
var fs = require('fs');
var path = require('path');
// var redisDB =require('../utils/redis/redis');
// const publish = require('../utils/redis/publish')   // 发布订阅消息
// const redis = require('redis')
const config = require('../config/config');
const { uploadFile } = require('../utils/upload')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('/login', async (ctx, next) => {

  let data = {}


  const result = await DB.query(`
    select * from login where username = '${ctx.request.body.username}' 
    and password = '${ctx.request.body.password}'
  `)

  console.log(result)

  if (result.length != 0) {
    data = {
      code: 20000,
      data: {
        accessToken: result[0].token
      }
    }
  } else {
    data = {
      code: 20001,
      data: {

      }
    }
  }




  // redisDB.set('usersLogin',JSON.stringify(data),function(err,result){
  //     if(err){
  //         console.log(err)  
  //     }else{
  //         console.log(result) 

  //     }
  // }, 5000,1)


  //   redisDB.get('usersLogin',function(err,result){
  //     if(err){
  //         console.log(err)
  //     }else{
  //       console.log('aaaa')
  //         console.log(JSON.parse(result))
  //         console.log('eee')
  //     }
  // })








  ctx.body = data;


})




router.post('/register', async (ctx, next) => {
  let result = {}
  const info = JSON.parse(ctx.request.body.info);
  let fileArr = Object.entries(ctx.request.files)


  
  if (fileArr.length != 0) {
    result = await uploadFile(fileArr)

    // console.log(result)

    
    await DB.query(`
              insert into login(username,password,photo,photo_name,random_num,phone,postbox,token)
              values('${info.username}','${info.password}','${result[0].fileUrl}','${result[0].fileName}','${result[0].randomNum}',${info.phone},'${info.postbox}','${uuid.v1()}')
          `)
    if (result) {
      console.log("注册成功")
      ctx.response.body = result;
    } else {
      console.log(333)
      ctx.response.body = "注册失败！"
    }
  } else {
    console.log(4444)
    ctx.response.body = "没有选择图片"
  }


  ctx.body = {
    code: 20000,
    result
  }

})




router.post('/info', async (ctx, next) => {

  const username = ctx.request.body.username || "";

  const result = await DB.query(`
    select * from login where username = '${username}'
  `)

  console.log(result)


  const user = {
    // avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    avatar:  config.url+ result[0].photo,
    email: "editor@test.com",
    id: 1,
    introduction: "I am an editor",
    name: username,
    password: "any",
    phone: "1234567890",
    roles: [`${result[0].roles}`],
    username: result[0].username
  }
  const userInfo = {
    user: user
  }
  const data = {
    code: 20000,
    data: userInfo
  }

  ctx.body = data
});

router.post('/logout', async (ctx, next) => {
  const data = {
    code: 20000,
    data: {}
  }
  ctx.body = data
})


module.exports = router
