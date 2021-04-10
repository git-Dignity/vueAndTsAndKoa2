/*
 * @Author: your name
 * @Date: 2021-04-10 11:12:03
 * @LastEditTime: 2021-04-10 14:54:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vueTsKoa\config\swaggerDec.js
 */
const { SwaggerRouter } = require('koa-swagger-decorator');
const path = require('path')

const router = new SwaggerRouter();

// swagger docs avaliable at http://localhost:3000/swagger-html
router.swagger({
    title: '排课系统',
    description: 'API DOC',
    version: '1.0.0'
});
// 查找对应目录下的controller类
router.mapDir(path.resolve(__dirname, '../routes/'), {
    // default: true, if true, you can call ctx.validatedBody[Query|Params] to get validated data.
  
  });

module.exports = router