/*
 * @Author: zemin zheng
 * @Date: 2021-04-10 17:24:49
 * @LastEditTime: 2021-04-10 17:56:56
 * @LastEditors: Please set LastEditors
 * @Description: swagger-jsdoc的配置文件
 * @FilePath: \vueTsKoa\config\swagger-jsdoc.js
 * @Url：http://localhost:3333/swagger
 */

const router = require('koa-router')(); // 引入路由函数
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
    info: {
    description:
      'This is a sample server Koa2 server.  You can find out more about     Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).      For this sample, you can use the api key `special-key` to test the authorization     filters.',
    version: '1.0.0',
    title: 'Koa2_server Swagger',
    // 服务条款
    // termsOfService: 'http://swagger.io/terms/',
    contact: {
      name: 'Contact developers',
      url: 'https://mail.qq.com/',
      email: '741167479@qq.com'
    },
    // 开源协议
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  host: 'localhost:3333',
  basePath: '/', // Base path (optional), host/basePath
  schemes: ['http', 'https'],
  securityDefinitions: {
    server_auth: {
      type: 'oauth2',
      description: '登录账号密码鉴权',
      tokenUrl: 'http://localhost:3333/image/oauth',
      flow: 'password',
      scopes: {
        token: 'modify pets in your account'
      }
    },
    token: {
      type: 'apiKey',
      name: 'token',
      in: 'header'
    }
  }
};
const options = {
  swaggerDefinition,
  // 写有注解的router的存放地址(当你新增swagger时文档里没显示出来的话那么就是这边地址没有加进去)
  apis: ['./routes/*.js', './routes/*/*.js'] // routes下所有的js文件和routes/image下所有js文件
};
const swaggerSpec = swaggerJSDoc(options);
// 通过路由获取生成的注解文件
router.get('/swagger.json', async ctx => {
  ctx.set('Content-Type', 'application/json');
  ctx.body = swaggerSpec;
});

module.exports = router;
// 将页面暴露出去
