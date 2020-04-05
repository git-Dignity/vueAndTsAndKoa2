const router = require('koa-router')()
var db = require('../utils/db')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('/login', function (ctx, next) {
  const data = {
    code:20000,
    data:{
      accessToken: "admin-token"
    }
  }
  ctx.body = data
})

router.post('/info', function(ctx, next) {
  console.log(111)
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
  