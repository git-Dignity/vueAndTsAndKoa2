const router = require('koa-router')()
var db = require('../utils/db')
// var redisDB =require('../utils/redis/redis');
// const publish = require('../utils/redis/publish')   // 发布订阅消息
// const redis = require('redis')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('/login', function (ctx, next) {
  console.log('come on')
  const data = {
    code:20000,
    data:{
      accessToken: "admin-token"
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

router.post('/info', function(ctx, next) {
//   console.log('ooo')
//   redisDB.get('usersLogin',function(err,result){
//     if(err){
//         console.log(err)
//     }else{
//       console.log('aaaa')
//         console.log(JSON.parse(result))
//         console.log('eee')
//     }
// })
//   console.log('ooo')


  // async(ctx) => {
    const user = {
        avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        email: "editor@test.com",
        id: 1,
        introduction: "I am an editor",
        name: "aaa",
        password: "any",
        phone: "1234567890",
        roles: ["editor"],
        username: "editor"
      }
      const userInfo = {
        user:user
      }
      const data = {
        code:20000,
        data :userInfo
      }
      ctx.body = data
  // }
});

module.exports = router
  