/*
 * @Author: zemin zheng
 * @Date: 2021-04-10 11:12:03
 * @LastEditTime: 2021-04-11 18:37:41
 * @LastEditors: Please set LastEditors
 * @Description: koa-swagger-decorator的配置文件
 * @FilePath: \vueTsKoa\config\swagger-decorator.js
 */
const { SwaggerRouter } = require('koa-swagger-decorator');
const path = require('path')

const router = new SwaggerRouter();

// swagger docs avaliable at http://localhost:3333/swagger-html
router.swagger({
    title: '音乐博客Koa',
    description: '服务于音乐博客http://zhengzemin.cn:3000/',
    version: '1.0.1'
});
// 查找对应目录下的controller类
router.mapDir(path.resolve(__dirname, '../src/'), {
    // default: true, if true, you can call ctx.validatedBody[Query|Params] to get validated data.
});

module.exports = router