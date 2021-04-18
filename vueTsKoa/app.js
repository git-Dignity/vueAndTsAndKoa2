const Koa = require('koa')
const app = new Koa()
require("babel-register");
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
var mysql = require('mysql');
const ErrorRoutes = require('./routes/error-routes')
const ErrorRoutesCatch = require('./middleware/ErrorRoutesCatch')
const cors = require("koa-cors"); //可以写ajax实现实现异步跨域，在表头加上http头
require('module-alias/register'); // 设置别名（需要在package.json设置）
// swagger接口文档（swagger-jsdoc）
const swagger = require('./config/swagger-jsdoc');
const koaSwagger = require('koa2-swagger-ui')
const testSwaggerJsdoc = require('./routes/test/test-swagger-jsdoc')

// koa-swagger-decorator
const swaggerDecorator = require('./config/swagger-decorator');


const index = require('./routes/index')
const users = require('./routes/users')
// const user = require('./routes/sys/user')
const role = require('./routes/sys/role')
const menu = require('./routes/sys/menu')
const certificateAuthentication = require('./routes/personal/personalView/certificateAuthentication')
const music = require('./routes/music/index')
// const apiInterface = require('./routes/apiInterface/index')
// const agentEvent = require('./routes/agentEvent/index') // 代办事项
const common = require('./routes/common/common') // 公共
// const frontEnd = require('./routes/itKnowledge/frontEnd') // IT知识 -- 前端
// const featuresDev = require('./routes/featuresDev/index') // 功能开发




// 定时器
require('./timer/loveWords')  // 定时发送情话（qq邮箱）

// error handler
onerror(app)

 
app.use(cors());





const koaBody = require('koa-body');
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024*3,    // 设置上传文件大小最大限制，默认6M
        multipart: true
    }
}));


// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text'],
  multipart: true
}))  
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public')) // 指向前端打包的dist路径

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// swagger-jsdoc
app.use(swagger.routes(), swagger.allowedMethods());
app.use(
  koaSwagger.koaSwagger({
    routePrefix: '/swagger', // host at /swagger instead of default /docs
    swaggerOptions: {
      url: '/swagger.json' // example path to json
    }
  })
);


// koa-swagger-decorator
app.use(swaggerDecorator.routes(), swaggerDecorator.allowedMethods())

// routes
app.use(testSwaggerJsdoc.routes(), testSwaggerJsdoc.allowedMethods()) 
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(role.routes(), role.allowedMethods())
// app.use(user.routes(), user.allowedMethods())
app.use(menu.routes(), menu.allowedMethods())
app.use(certificateAuthentication.routes(), certificateAuthentication.allowedMethods())
app.use(music.routes(), music.allowedMethods())
// app.use(apiInterface.routes(), apiInterface.allowedMethods())
// app.use(agentEvent.routes(), agentEvent.allowedMethods())
app.use(common.routes(), common.allowedMethods())
// app.use(frontEnd.routes(), frontEnd.allowedMethods())
// app.use(featuresDev.routes(), featuresDev.allowedMethods())

app.use(ErrorRoutes())
app.use(ErrorRoutesCatch())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

if (process.env.NODE_ENV == "dev") {
   // logger
  app.use((ctx, next) => {
    const start = new Date()
    return next().then(() => {
      const ms = new Date() - start
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
  })
}




module.exports = app
