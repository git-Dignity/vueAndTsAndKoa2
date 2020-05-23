const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
var mysql = require('mysql');
const cors = require("koa-cors"); //可以写ajax实现实现异步跨域，在表头加上http头

const index = require('./routes/index')
const users = require('./routes/users')
const role = require('./routes/sys/role')
const certificateAuthentication = require('./routes/personal/personalView/certificateAuthentication')
const music = require('./routes/music/index')

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
app.use(require('koa-static')(__dirname + '/public'))

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

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(role.routes(), role.allowedMethods())
app.use(certificateAuthentication.routes(), certificateAuthentication.allowedMethods())
app.use(music.routes(), music.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});




module.exports = app
